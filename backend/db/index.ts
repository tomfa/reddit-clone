import {firestore, serverTimestamp} from "../firebase";
import {
  Maybe,
  Post,
  PostSort,
  QueryGetUserByIdArgs,
  QueryPostsArgs,
  User,
  VoteValue,
} from "../../graphql/generated/types";
import {useCollection} from "react-firebase-hooks/firestore";
import {slugify} from "../../utils/string.utils";
import {DBPost, DBUser, DBVote} from "./types";
import {POSTS, USERS, VOTES} from "./collections";
import {uuid} from "uuidv4";
import {getNumericVoteValue} from "../../graphql/vote.utils";

export const getUserById = async ({
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

export const getUserByEmail = async (email: string): Promise<User | null> => {
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
  return addUser(user);
};

export const addUser = async (
  user: Omit<User, "id" | "username" | "createdAt"> & {
    authId: string;
    email: string;
    username?: Maybe<string>;
  }
): Promise<User> => {
  const id = uuid();
  // TODO: Check that email and doesn't conflict?
  const uName = user.username || user.email;

  const userDoc = firestore.doc(`${USERS}/${id}`);
  const usernameDoc = firestore.doc(`usernames/${uName}`);

  // TODO: I don't understand why we create a username doc
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

export const getPostsForUser = async (userId: string): Promise<Post[]> => {
  const ref = firestore.collection(USERS).doc(userId).collection(POSTS);
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);

  // @ts-ignore
  const posts = querySnapshot?.docs.map((doc: unknown) => doc.data());
  return posts || [];
};

export const addPost = async (
  author: User,
  post: Pick<Post, "type" | "title" | "category" | "content">
): Promise<Post> => {
  const slug = encodeURI(slugify(post.title));
  const ref = firestore
    .collection(USERS)
    .doc(author.id)
    .collection(POSTS)
    .doc(slug);

  const data: DBPost = {
    ...post,
    published: true,
    slug,
    author,
    score: 0,
    comments: [],
    views: 0,
    numVotes: 0,
    createdAt: serverTimestamp(),
  };

  await ref.set(data);
  return data;
};

export const vote = async (args: {
  authorId: string;
  postSlug: string;
  userId: string;
  value: VoteValue;
}): Promise<Post> => {
  const postRef = firestore
    .collection(USERS)
    .doc(args.authorId)
    .collection(POSTS)
    .doc(args.postSlug);

  const voteRef = postRef.collection(VOTES).doc(args.userId);
  const existingVote = (await voteRef.get().then((d) => d.data())) as DBVote;
  const existingVoteValue = getNumericVoteValue(
    existingVote?.vote || VoteValue.Neutral
  );
  const valueDiff = getNumericVoteValue(args.value) - existingVoteValue;

  console.log(`Voting ${args.value} for ${args.postSlug}`);
  const post: DBPost = await firestore.runTransaction(async (transaction) => {
    const res = await transaction.get(postRef);
    if (!res.exists) {
      throw "Document does not exist!";
    }
    const data = res.data() as DBPost;
    if (!existingVote && args.value === VoteValue.Neutral) {
      return data;
    }

    const newScore = data.score + valueDiff;
    const previousCount = existingVote ? 1 : 0;
    const newCount = args.value !== VoteValue.Neutral ? 1 : 0;
    const countDiff = newCount - previousCount;
    const newNumVotes = data.numVotes + countDiff;

    const updatedFields: Partial<DBPost> = {
      numVotes: newNumVotes,
      score: newScore,
    };

    const vote: DBVote = {
      id: uuid(),
      postSlug: args.postSlug,
      userId: args.userId,
      vote: args.value,
    };

    transaction.update(postRef, updatedFields);
    if (args.value === VoteValue.Neutral) {
      transaction.delete(voteRef);
    } else {
      transaction.set(voteRef, vote);
    }

    return { ...data, ...updatedFields, myVote: vote };
  });

  return post;
};

export const unVote = async (args: {
  authorId: string;
  postSlug: string;
  userId: string;
}): Promise<Post> => {
  return vote({ ...args, value: VoteValue.Neutral });
};

const getVotesForUser = async (args: {
  userId?: string;
  filterPostIds: string[];
}): Promise<{ [postId: string]: DBVote }> => {
  if (!args.userId || !args.filterPostIds.length) {
    return {};
  }

  let query = await firestore
    .collectionGroup(VOTES)
    .where("userId", "==", args.userId)
    .where("postSlug", "in", args.filterPostIds)
    .get();

  const votes = query.docs.map((d) => d.data()) as DBVote[];
  return args.filterPostIds.reduce(
    (map, postSlug) => ({
      ...map,
      [postSlug]: votes.find((v) => v.postSlug === postSlug),
    }),
    {}
  );
};

export const getPosts = async ({
  order,
  cursor,
  limit = 20,
  userId,
  ...filter
}: QueryPostsArgs & {
  limit?: number;
  userId?: string;
}): Promise<Post[]> => {
  let query = firestore
    .collectionGroup(POSTS)
    .where("published", "==", true)
    .limit(limit);

  const sortBy = filter.sort || PostSort.Recent;
  const sortField = sortBy === PostSort.Recent ? "createdAt" : "score";

  query = query.orderBy(sortField, order || "desc");

  if (filter.category) {
    query = query.where("category", "==", filter.category);
  }

  if (filter.createdAfter) {
    query = query.where("createdAt", ">", filter.createdAfter);
  }

  if (cursor) {
    query = query.startAfter(cursor);
  }

  const data = await query.get().then((d) => d.docs);
  const posts = data.map((p) => p.data()) as DBPost[];
  const votesForUser = await getVotesForUser({
    userId,
    filterPostIds: posts.map((p) => p.slug),
  });
  return posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toDate(),
    myVote: votesForUser[p.slug],
  }));
};

export const db = {
  addPost,
  addUser,
  getOrCreateUser,
  getPostsForUser,
  getUserById,
  getPosts,
  vote,
  unVote,
};
