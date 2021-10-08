import { MutationAddPostArgs, Post } from "../../graphql/generated/types";
import { UserAuth } from "../../request.types";
import { db } from "../db";

export const addPost = async (
  { input }: MutationAddPostArgs,
  auth: UserAuth
): Promise<Post> => {
  return db.addPost(auth, input);
};
