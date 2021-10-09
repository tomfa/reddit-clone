import { firestore, serverTimestamp } from "../firebase";
import * as firebase from "firebase-admin";
import {
  AddCommentInput,
  Comment,
  Maybe,
  MutationVoteArgs,
  Post,
  PostSort,
  QueryCommentsArgs,
  QueryGetPostByIdArgs,
  QueryGetUserByIdArgs,
  QueryPostsArgs,
  User,
  VoteValue,
} from "../../graphql/generated/types";
import { useCollection as getCollection } from "react-firebase-hooks/firestore";
import { slugify } from "../../utils/string.utils";
import { DBComment, DBPost, DBUser, DBVote } from "./types";
import { COMMENT, POSTS, USERS, VOTES } from "./collections";
import { uuid } from "uuidv4";
import { getNumericVoteValue } from "../../graphql/vote.utils";
import { UserAuth } from "../../request.types";
import { config } from "../../lib/config";
import { getDomainFromEmail } from "../../utils/user.utils";
import { getDateMeta } from "../../utils/date.utils";

const increment = firebase.firestore.FieldValue.increment(1);
const add = (num: number) => firebase.firestore.FieldValue.increment(num);

const getUserById = async ({
  id,
}: QueryGetUserByIdArgs): Promise<User | null> => {
  const query = await firestore
    .collection(USERS)
    .where("id", "==", id)
    .limit(1)
    .get();
  if (query.docs.length === 0) {
    return null;
  }
  const user = query.docs[0].data() as DBUser;
  return { ...user, name: user.name || null };
};

const increasePostViewCount = async ({ post }: { post: Post }) => {
  await firestore
    .collection(USERS)
    .doc(post.author.id)
    .collection(POSTS)
    .doc(post.id)
    .update({ views: increment });
};

const getPostById = async (
  { id, incrementViews }: QueryGetPostByIdArgs & { incrementViews?: boolean },
  auth: UserAuth | null
): Promise<Post | null> => {
  let query = await firestore
    .collectionGroup(POSTS)
    .where("id", "==", id)
    .limit(1)
    .get();

  if (query.docs.length === 0) {
    return null;
  }
  const post = query.docs[0].data() as DBPost;

  const incementPromise = incrementViews
    ? increasePostViewCount({ post })
    : Promise.resolve();

  const [votesForUser, _] = await Promise.all([
    getVotesForUser({
      userId: auth?.id,
      filterPostIds: [id],
    }),
    incementPromise,
  ]);
  return {
    ...post,
    views: post.views + 1,
    myVote: votesForUser[id],
  };
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const query = await firestore
    .collection(USERS)
    .where("email", "==", email)
    .limit(1)
    .get();
  if (query.docs.length === 0) {
    return null;
  }
  const user = query.docs[0].data() as DBUser;
  return user;
};

const getOrCreateUser = async (
  user: Omit<User, "id" | "username" | "createdAt"> & {
    authId: string;
    email: string;
    username?: Maybe<string>;
  }
): Promise<User> => {
  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    return existingUser;
  }
  const domain = getDomainFromEmail(user.email);
  const isAllowedSignup =
    !config.auth.allowSignupFromDomains ||
    config.auth.allowSignupFromDomains.includes(domain);
  if (!isAllowedSignup) {
    throw new Error(`User signup is not allowed from domain ${domain}`);
  }
  return addUser(user);
};

const setPostArchived = async (post: Post, archived: boolean) => {
  const postRef = firestore
    .collection(USERS)
    .doc(post.author.id)
    .collection(POSTS)
    .doc(post.id);

  await postRef.update({ archived });

  return { ...post, archived };
};

const addComment = async (
  input: AddCommentInput,
  auth: UserAuth
): Promise<Comment> => {
  const commentId = uuid();
  const postRef = firestore
    .collection(USERS)
    .doc(auth.id)
    .collection(POSTS)
    .doc(input.postId);

  const commentRef = postRef.collection(COMMENT).doc(commentId);

  const comment: DBComment = await firestore.runTransaction(
    async (transaction) => {
      const post = await transaction.get(postRef);
      if (!post.exists) {
        throw "Document does not exist!";
      }

      const data: DBComment = {
        postId: post.id,
        id: commentId,
        author: auth,
        body: input.content,
        createdAt: serverTimestamp(),
      };

      transaction.update(postRef, {
        numComments: add(1),
      });
      transaction.set(commentRef, data);

      return data;
    }
  );

  return { ...comment, createdAt: new Date() };
};

const addUser = async (
  user: Omit<User, "id" | "username" | "createdAt"> & {
    authId: string;
    email: string;
    username?: Maybe<string>;
  }
): Promise<User> => {
  const id = uuid();
  const defaultUserName = user.email && user.email.split("@")[0];
  const uName = user.username || defaultUserName;

  const userDoc = firestore.doc(`${USERS}/${id}`);

  // TODO: I don't understand why we create a username doc
  const usernameDoc = firestore.doc(`usernames/${uName}`);
  const usernameTaken = await usernameDoc.get().then((d) => d.exists);

  if (usernameTaken) {
    throw new Error(`Username ${uName} already exists`);
  }

  // Commit both docs together as a batch write.
  const batch = firestore.batch();
  const data: DBUser = {
    ...user,
    username: uName,
    id,
    createdAt: serverTimestamp(),
  };
  batch.set(userDoc, data);
  batch.set(usernameDoc, { id });

  await batch.commit();
  return data;
};

const getPostsForUser = async (userId: string): Promise<Post[]> => {
  const ref = firestore.collection(USERS).doc(userId).collection(POSTS);
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = getCollection(query);

  // @ts-ignore
  const posts = querySnapshot?.docs.map((doc: unknown) => doc.data());
  return posts || [];
};

const addPost = async (
  author: User,
  post: Pick<Post, "type" | "title" | "category" | "content">
): Promise<Post> => {
  const slug = encodeURI(slugify(post.title));
  const id = uuid();
  const ref = firestore
    .collection(USERS)
    .doc(author.id)
    .collection(POSTS)
    .doc(id);

  const data: DBPost = {
    ...post,
    id,
    published: true,
    slug,
    author,
    meta: getDateMeta(new Date()),
    score: 0,
    views: 0,
    numVotes: 0,
    numComments: 0,
    createdAt: serverTimestamp(),
    archived: false,
  };

  await ref.set(data);
  return { ...data, createdAt: new Date() };
};

const vote = async (
  args: MutationVoteArgs & { userId: string }
): Promise<Post> => {
  const postRef = firestore
    .collection(USERS)
    .doc(args.authorId)
    .collection(POSTS)
    .doc(args.postId);

  const voteRef = postRef.collection(VOTES).doc(args.userId);
  const existingVote = (await voteRef.get().then((d) => d.data())) as DBVote;
  const existingVoteValue = getNumericVoteValue(
    existingVote?.vote || VoteValue.Neutral
  );
  const numScoreDiff = getNumericVoteValue(args.value) - existingVoteValue;

  console.log(`Voting ${args.value} for ${args.authorId}.${args.postId}`);
  const post: DBPost = await firestore.runTransaction(async (transaction) => {
    const res = await transaction.get(postRef);
    if (!res.exists) {
      throw "Document does not exist!";
    }
    const data = res.data() as DBPost;
    if (!existingVote && args.value === VoteValue.Neutral) {
      return data;
    }

    const newScore = data.score + numScoreDiff;
    const previousCount = existingVote ? 1 : 0;
    const newCount = args.value !== VoteValue.Neutral ? 1 : 0;
    const numVotesDiff = newCount - previousCount;

    const updatedFields: Partial<DBPost> = {
      numVotes: numVotesDiff,
      score: newScore,
    };

    const vote: DBVote = {
      id: uuid(),
      postId: args.postId,
      userId: args.userId,
      vote: args.value,
    };

    transaction.update(postRef, {
      numVotes: add(numVotesDiff),
      score: add(numScoreDiff),
    });
    if (args.value === VoteValue.Neutral) {
      transaction.delete(voteRef);
    } else {
      transaction.set(voteRef, vote);
    }

    return { ...data, ...updatedFields, myVote: vote };
  });

  return post;
};

const unVote = async (
  args: Omit<MutationVoteArgs, "value"> & { userId: string }
): Promise<Post> => {
  return vote({ ...args, value: VoteValue.Neutral });
};

const getVotesForUser = async (args: {
  userId?: string;
  filterPostIds: string[];
}): Promise<{ [postId: string]: DBVote }> => {
  if (!args.userId || !args.filterPostIds.length) {
    return {};
  }

  let query = firestore
    .collectionGroup(VOTES)
    .where("userId", "==", args.userId);

  if (args.filterPostIds.length === 1) {
    query = query.where("postId", "==", args.filterPostIds[0]);
  } else if (args.filterPostIds.length && args.filterPostIds.length < 10) {
    query = query.where("postId", "in", args.filterPostIds);
  } else {
    // TODO: Find a way to only retrieve votes by filterPostsId ("IN" is max 10)
  }

  const result = await query.get();

  const votes = result.docs.map((d) => d.data()) as DBVote[];
  return args.filterPostIds.reduce(
    (map, postId) => ({
      ...map,
      [postId]: votes.find((v) => v.postId === postId),
    }),
    {}
  );
};

const getComments = async ({
  cursor,
  limit = 20,
  ...filter
}: QueryCommentsArgs & {
  limit?: number;
}): Promise<Comment[]> => {
  let query = firestore.collectionGroup(COMMENT).limit(limit);

  query = query.orderBy("createdAt", "desc");

  if (filter.postId) {
    query = query.where("postId", "==", filter.postId);
  }
  if (filter.username) {
    query = query.where("author.username", "==", filter.username);
  }
  if (cursor) {
    query = query.startAfter(cursor.createdAt);
  }
  const data = await query
    .limit(limit)
    .get()
    .then((d) => d.docs);
  return data.map((p) => p.data()) as DBComment[];
};

const getPosts = async ({
  order,
  cursor,
  limit = 20,
  userId,
  ...filter
}: QueryPostsArgs & {
  limit?: number;
  userId?: string;
}): Promise<Post[]> => {
  let query;
  if (filter.sort === PostSort.Popular) {
    query = firestore
      .collectionGroup(POSTS)
      .orderBy("score", order || "desc")
      .orderBy("createdAt", "desc");
  } else {
    query = firestore
      .collectionGroup(POSTS)
      .orderBy("createdAt", order || "desc");
  }

  if (filter.year) {
    query = query.where("meta.year", "==", filter.year);
  }
  if (filter.month) {
    query = query.where("meta.month", "==", filter.month);
  }
  if (filter.week) {
    query = query.where("meta.week", "==", filter.week);
  }
  if (filter.category) {
    query = query.where("category", "==", filter.category);
  }
  if (filter.username) {
    query = query.where("author.username", "==", filter.username);
  }

  if (cursor) {
    if (filter.sort === PostSort.Popular) {
      query = query.startAfter(cursor.score, cursor.createdAt);
    } else {
      query = query.startAfter(cursor.createdAt);
    }
  }

  const data = await query
    .limit(limit)
    .get()
    .then((d) => d.docs);
  const posts = data.map((p) => p.data()) as DBPost[];
  const votesForUser = await getVotesForUser({
    userId,
    filterPostIds: posts.map((p) => p.id),
  });
  return posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toDate(),
    myVote: votesForUser[p.id],
  }));
};

export const db = {
  addPost,
  addUser,
  getOrCreateUser,
  getPostsForUser,
  getUserById,
  getPosts,
  addComment,
  getPostById,
  unVote,
  vote,
  getComments,
  setPostArchived,
};
export default db;
