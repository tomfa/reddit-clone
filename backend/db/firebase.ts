import * as firebase from "firebase-admin";

let app: firebase.app.App | null = null;

if (!firebase.apps.length) {
  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n");
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const databaseUrl = `https://${projectId}/.firebaseio.com`;
  app = firebase.initializeApp({
    credential: firebase.credential.cert({
      privateKey: privateKey,
      clientEmail: clientEmail,
      projectId: projectId,
    }),
    databaseURL: databaseUrl,
  });
}

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
