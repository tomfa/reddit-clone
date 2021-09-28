import {UserAuth} from "./request.types";
import {JWT} from "next-auth/jwt";

export const toUserAuth = (jwt: JWT | null): UserAuth => {
  const userEmail = jwt?.email;
  if (!userEmail) {
    return null
  }
  return {
    email: userEmail,
    image: jwt?.picture,
    name: jwt?.name
  }
}
