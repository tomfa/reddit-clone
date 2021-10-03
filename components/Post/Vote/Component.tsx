import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import PostVoteUpvote from "./Upvote";
import PostVoteDownvote from "./Downvote";
import {
  Post,
  useVoteMutation,
  VoteValue,
} from "../../../graphql/generated/types";
import { useUserData } from "../../../lib/hooks";
import { getNumericVoteValue } from "../../../graphql/vote.utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  padding: 4px;
  font-size: 12px;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color: var(--color-normalText);
`;

type Props = { post: Post };
const PostVote = (props: Props) => {
  const [voteMutation, voteResult] = useVoteMutation();
  const { user, isLoggedIn } = useUserData();
  const post: Post = useMemo(() => voteResult.data?.vote || props.post, [voteResult,props])
  const [voteValue, setVoteValue] = useState(post.myVote?.vote);
  const [scoreFromOthers, setScoreFromOthers] = useState(post.myVote ? post.score - getNumericVoteValue(post.myVote.vote) : post.score);
  const score = useMemo(() => scoreFromOthers + (voteValue ? getNumericVoteValue(voteValue) : 0), [voteValue, scoreFromOthers])
  const isByUser = post.author.id !== user?.id;
  const submitVote = useCallback(
    (newVote: VoteValue) => {
      const value = newVote === voteValue ? VoteValue.Neutral : newVote;
      setVoteValue(value)
      voteMutation({
        variables: {
          postSlug: post.slug,
          authorId: post.author.id,
          value,
        },
      });
    },
    [voteMutation, post]
  );

  const votingEnabled = !isByUser && isLoggedIn && !voteResult.loading

  return (
    <Wrapper>
      <PostVoteUpvote
        canVote={votingEnabled}
        hasVoted={voteValue === VoteValue.Positive}
        onClick={useCallback(
          () => submitVote(VoteValue.Positive),
          [submitVote]
        )}
      />
      <span>{ score}</span>
      <PostVoteDownvote
        canVote={votingEnabled}
        hasVoted={voteValue === VoteValue.Negative}
        onClick={useCallback(
          () => submitVote(VoteValue.Negative),
          [submitVote]
        )}
      />
    </Wrapper>
  );
};

export default PostVote;
