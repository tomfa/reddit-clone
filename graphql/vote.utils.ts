import { VoteValue } from "./generated/types";

export const getNumericVoteValue = (vote: VoteValue): number =>
  ({
    [VoteValue.Neutral]: 0,
    [VoteValue.Positive]: 1,
    [VoteValue.Negative]: -1,
  }[vote]);
