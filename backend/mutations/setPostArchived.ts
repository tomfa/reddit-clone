import {
  MutationSetPostArchivedArgs,
  Post,
} from "../../graphql/generated/types";
import { UserAuth } from "../../request.types";
import { db } from "../db";

export const setPostArchived = async (
  args: MutationSetPostArchivedArgs,
  auth: UserAuth
): Promise<Post> => {
  const post = await db.getPostById(args, null);
  if (!post) {
    throw new Error(`Post with id ${args.id} could not be found`);
  }
  if (post.author.id !== auth.id) {
    throw new Error(`You do not have admin access to post ${args.id}`);
  }
  if (post.archived === args.archived) {
    return post;
  }
  return db.setPostArchived(post, args.archived);
};
