import { createContext } from 'react';

type UserContextData = { user: null, username: null | string }
export const UserContext = createContext({ user: null, username: null });
