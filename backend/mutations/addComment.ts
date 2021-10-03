import {
  Comment, MutationAddCommentArgs,
  MutationAddPostArgs,
  Post
} from "../../graphql/generated/types";
import { UserAuth } from "../../request.types";
import {db} from "../db";

export const addComment = async (
  { input }: MutationAddCommentArgs,
  auth: UserAuth
): Promise<Comment> => {
  return db.addComment(input, auth)
};
