import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import {config} from "./config";

let app: firebase.app.App | null = null;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

if (!app) {
  console.log(`Initializing firebase app`)
  app = firebase.initializeApp(config.firebase)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore()
export const storage = firebase.storage()

