import {firestore, serverTimestamp} from "../firebase";
import {
  Maybe,
  Post,
  PostSort,
  QueryPostsArgs,
  User
} from "../../graphql/generated/types";
import {useCollection} from "react-firebase-hooks/firestore";
import {slugify} from "../../utils/string.utils";
import {DBPost, DBUser} from "./types";
import {POSTS, USERS} from "./collections";
import {uuid} from "uuidv4";

export const getUserById = async (id: string): Promise<User | null> => {
  const query = await firestore
    .collection(USERS)
    .where("id", "==", id)
    .limit(1)
    .get();
  if (query.docs.length === 0) {
    return null;
  }
  const user = query.docs[0].data() as DBUser;
  return user;
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
  const id = uuid();
  const slug = encodeURI(slugify(post.title));
  const ref = firestore
    .collection(USERS)
    .doc(author.id)
    .collection(POSTS)
    .doc(slug);

  const data: DBPost = {
    ...post,
    id,
    published: true,
    slug,
    author,
    score: 0,
    comments: [],
    views: 0,
    votes: [],
    createdAt: serverTimestamp(),
  };

  await ref.set(data);
  return data;
};

export const getPosts = async ({
  order,
  cursor,
  limit = 20,
  ...filter
}: QueryPostsArgs & {
  limit?: number;
} = {}): Promise<Post[]> => {
  let query = firestore
    .collectionGroup(POSTS)
    .where("published", "==", true)
    .limit(limit);

  const sortBy = filter.sort || PostSort.Recent;
  const sortField = sortBy === PostSort.Recent ? "createdAt" : "score"

  query = query.orderBy(sortField, order || "desc")

  if (filter.category) {
    query = query.where('category', '==', filter.category)
  }

  if (filter.createdAfter) {
    query = query.where('createdAt', '>', filter.createdAfter)
  }

  if (cursor) {
    query = query.startAfter(cursor);
  }

  const data = await query.get().then((d) => d.docs);
  const posts = data.map((p) => p.data()) as DBPost[];
  return posts.map((p) => ({ ...p, createdAt: p.createdAt.toDate() }));
};

export const db = {
  addPost,
  addUser,
  getOrCreateUser,
  getPostsForUser,
  getUserById,
  getPosts,
};
