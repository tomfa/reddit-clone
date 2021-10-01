import { EmptyResolverArgs, UserAuth } from "../../request.types";
import { Post, PostType } from "../../graphql/generated/types";
import { db } from "../../lib/db";

export const getPosts = async (
  args: EmptyResolverArgs,
  user: UserAuth | null
): Promise<Post[]> => {
  return db.getPosts();
};
