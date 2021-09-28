import firebase from "firebase/compat";
import { firestore } from "./firebase";

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
