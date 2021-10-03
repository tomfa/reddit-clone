declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    username: string;
    picture?: string | null;
    sub?: string;
  }

}

import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      username: string;
      image?: string | null;
    };
  }
}
