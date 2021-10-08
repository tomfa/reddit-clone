import { UserAuth } from "../../request.types";
import { Post, QueryPostsArgs } from "../../graphql/generated/types";
import { db } from "../db";

export const getPosts = async (
  args: QueryPostsArgs,
  user: UserAuth | null
): Promise<Post[]> => {
  return db.getPosts({ ...args, userId: user?.id });
};
