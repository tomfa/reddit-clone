import {
  MutationVoteArgs,
  Post,
  VoteValue,
} from "../../graphql/generated/types";
import { UserAuth } from "../../request.types";
import { db } from "../db";

export const vote = async (
  {  value, ...args }: MutationVoteArgs,
  auth: UserAuth
): Promise<Post> => {
  if (value === VoteValue.Neutral) {
    return db.unVote({...args, userId: auth.id});
  }
  return db.vote({ ...args, userId: auth.id, value });
};
