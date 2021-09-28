import firebase from "firebase/compat/app";
import { firestore, serverTimestamp } from "./firebase";
import { Post } from "../graphql/generated/types";
import { useCollection } from "react-firebase-hooks/firestore";
import { slugify } from "../utils/string.utils";

export const addUser = async (
  user: firebase.User,
  username?: string
): Promise<void> => {
  const uName = username || user.email || user.uid;
  const userDoc = firestore.doc(`users/${user.uid}`);
  const usernameDoc = firestore.doc(`usernames/${uName}`);

  // Commit both docs together as a batch write.
  const batch = firestore.batch();
  batch.set(userDoc, {
    username: uName,
    photoURL: user.photoURL,
    displayName: user.displayName,
  });
  batch.set(usernameDoc, { uid: user.uid });

  await batch.commit();
};

export const getPostsForUser = async (userId: string): Promise<Post[]> => {
  const ref = firestore.collection("users").doc(userId).collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);

  // @ts-ignore
  const posts = querySnapshot?.docs.map((doc: unknown) => doc.data());
  return posts || [];
};

export const addPost = async (
  authorId: string,
  post: Pick<Post, "type" | "title" | "category">
) => {
  const slug = encodeURI(slugify(post.title));
  const ref = firestore
    .collection("users")
    .doc(authorId)
    .collection("posts")
    .doc(slug);

  const data: Omit<Post, "author"> & { authorId: string } = {
    ...post,
    authorId,
    score: 0,
    comments: [],
    views: 0,
    votes: [],
    created: serverTimestamp(),
  };

  await ref.set(data);

  return { slug };
};
