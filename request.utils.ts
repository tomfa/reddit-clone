import { UserAuth } from "./request.types";
import { JWT } from "next-auth/jwt";

export const toUserAuth = (jwt: JWT): UserAuth => {
  return {
    id: jwt.id,
    username: jwt.username,
    name: jwt.name,
  };
};
