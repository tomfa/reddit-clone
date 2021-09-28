import { createContext } from 'react';
import firebase from "firebase/compat";

type UserContextData = { user: null | firebase.User, username: null | string }
export const UserContext = createContext<UserContextData>({ user: null, username: null });
