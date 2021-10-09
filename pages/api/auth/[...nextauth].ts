/* eslint-disable no-param-reassign, unused-imports/no-unused-vars */
import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Providers from "next-auth/providers";
import { db } from "../../../backend/db";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session(session, token: JWT): Promise<Session> {
      return {
        user: {
          id: token.id,
          username: token.username,
          name: token.name,
          image: token.picture as string,
        },
      };
    },
    async jwt(token) {
      if (!token.email || !token.sub) {
        throw new Error(`Unable to log in without email`);
      }
      if (!token.id) {
        const user = await db.getOrCreateUser({
          authId: token.sub,
          name: token.name,
          email: token.email,
        });
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
      }
      if (!token.username) {
        token.username = token.name || token.email;
      }

      return token;
    },
  },
});
