import * as firebase from "firebase-admin";
import { config } from "../lib/config";

let app: firebase.app.App | null = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp({
    credential: firebase.credential.cert({
      privateKey: config.firebase.privateKey,
      clientEmail: config.firebase.clientEmail,
      projectId: config.firebase.projectId,
    }),
    databaseURL: config.firebase.databaseUrl,
  });
  console.log("initialize");
}

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
