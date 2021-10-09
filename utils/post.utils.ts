import { Post, QueryPostsArgs } from "../graphql/generated/types";
import { getDateMeta } from "./date.utils";

export const getUpvotePercentage = ({ numVotes, score }: Post): number => {
  if (numVotes === 0) {
    return 100;
  }
  console.log({ numVotes, score });
  const upvotesFraction = (numVotes + score) / (2 * numVotes);
  return 100 * upvotesFraction;
};

export const EMPTY_TIME_FILTER = { year: null, month: null, week: null };
export const getTimeFilterOptions = (): Array<{
  value: Pick<QueryPostsArgs, "year" | "month" | "week">;
  label: string;
}> => {
  const now = new Date();
  const meta = getDateMeta(now);

  return [
    {
      value: { ...EMPTY_TIME_FILTER, year: meta.year, week: meta.week },
      label: "This week",
    },
    {
      value: { ...EMPTY_TIME_FILTER, year: meta.year, month: meta.month },
      label: "This month",
    },
    { value: { ...EMPTY_TIME_FILTER, year: meta.year }, label: "This year" },
    { value: EMPTY_TIME_FILTER, label: "All" },
  ];
};
