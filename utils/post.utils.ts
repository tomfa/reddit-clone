import { Post } from "../graphql/generated/types";

export const getUpvotePercentage = ({ numVotes, score }: Post): number => {
  if (numVotes === 0) {
    return 100;
  }
  console.log({ numVotes, score });
  const upvotesFraction = (numVotes + score) / (2 * numVotes);
  return 100 * upvotesFraction;
};

export const getTimeFilterOptions = () => {
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  const lastMonth = new Date(now.getTime() - 31 * 24 * 3600 * 1000);
  const lastYear = new Date(now.getTime() - 365 * 24 * 3600 * 1000);
  const allTime = undefined;
  return [
    { value: lastWeek, label: "This week" },
    { value: lastMonth, label: "This month" },
    { value: lastYear, label: "This year" },
    { value: allTime, label: "All" },
  ];
};
