import { UserAuth } from "../../request.types";
import {
  Comment,
  Post,
  QueryCommentsArgs,
  QueryPostsArgs,
} from "../../graphql/generated/types";
import { db } from "../db";

export const getComments = async (
  args: QueryCommentsArgs,
  user: UserAuth | null
): Promise<Comment[]> => {
  return db.getComments(args);
};
