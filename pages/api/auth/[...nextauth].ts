/* eslint-disable no-param-reassign, unused-imports/no-unused-vars */
import NextAuth, { Account, Profile, User } from "next-auth";
import Providers from "next-auth/providers";
import { JWT } from "next-auth/jwt";
import { db } from "../../../lib/db";

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
      }
      if (!token.username) {
        token.username = token.email;
      }

      return token;
    },
  },
});
