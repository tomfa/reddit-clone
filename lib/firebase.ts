import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import {config} from "./config";


if (!firebase.app.length) {
  firebase.initializeApp(config.firebase)
}

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
