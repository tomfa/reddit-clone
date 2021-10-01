import {
  MutationAddPostArgs,
  MutationAddUserArgs,
  Post, User
} from "../../graphql/generated/types";
import { slugify } from "../../utils/string.utils";
import { UserAuth } from "../../request.types";
import {db} from "../../lib/db";

export const addUser = async (
  { input }: MutationAddUserArgs,
  auth: UserAuth
): Promise<User> => {
  return await db.addUser(input);
};
