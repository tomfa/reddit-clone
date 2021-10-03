import { UserAuth } from "../../request.types";
import {
  Post,
  QueryGetPostBySlugArgs,
} from "../../graphql/generated/types";
import db from "../db";

export const getPostBySlug = async (
  args: QueryGetPostBySlugArgs,
  user: UserAuth | null
): Promise<Post | null> => {
  return db.getPostBySlug({...args, incrementViews: true }, user);
};
