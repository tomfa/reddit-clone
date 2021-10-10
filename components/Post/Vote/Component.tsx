import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import PostVoteUpvote from "./Upvote";
import PostVoteDownvote from "./Downvote";
import {
  Post,
  useVoteMutation,
  VoteValue,
} from "../../../graphql/generated/types";
import { useUserData } from "../../../lib/hooks";

const Wrapper = styled.div<{ alignCenter: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(p) => (p.alignCenter && `center`) || "flex-start"};
  margin-top: ${(p) => (p.alignCenter && `0`) || "0.3rem"};
  min-width: 2.5rem;
  font-size: 12px;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color: var(--color-text);
`;

const CenteredSpan = styled.span`
  display: block;
  width: 100%;
  text-align: center;
`;

type Props = { post: Post; full: boolean };
const PostVote = ({ post, full }: Props) => {
  const [voteMutation, voteResult] = useVoteMutation();
  const { user, isLoggedIn } = useUserData();
  const voteValue = post.myVote?.vote;
  const isByUser = post.author.id === user?.id;
  const submitVote = useCallback(
    (newVote: VoteValue) => {
      const value = newVote === voteValue ? VoteValue.Neutral : newVote;
      voteMutation({
        variables: {
          postId: post.id,
          authorId: post.author.id,
          value,
        },
      });
    },
    [voteMutation, post, voteValue]
  );

  const votingEnabled = !isByUser && isLoggedIn && !voteResult.loading;

  return (
    <Wrapper alignCenter={!full}>
      <PostVoteUpvote
        canVote={votingEnabled}
        hasVoted={voteValue === VoteValue.Positive}
        onClick={useCallback(
          () => submitVote(VoteValue.Positive),
          [submitVote]
        )}
      />
      <CenteredSpan>{post.score}</CenteredSpan>
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
