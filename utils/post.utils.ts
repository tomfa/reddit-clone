import { Post } from "../graphql/generated/types";

export const getUpvotePercentage = ({ numVotes, score }: Post): number => {
  if (numVotes === 0) {
    return 100;
  }
  console.log({ numVotes, score });
  const upvotesFraction = (numVotes + score) / (2 * numVotes);
  return 100 * upvotesFraction;
};
