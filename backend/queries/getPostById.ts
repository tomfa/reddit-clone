import { UserAuth } from "../../request.types";
import {
  Post,
  QueryGetPostByIdArgs,
} from "../../graphql/generated/types";
import db from "../db";

export const getPostById = async (
  args: QueryGetPostByIdArgs,
  user: UserAuth | null
): Promise<Post | null> => {
  return db.getPostById({...args, incrementViews: true }, user);
};
