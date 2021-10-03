import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import PostVoteUpvote from "./Upvote";
import PostVoteDownvote from "./Downvote";
import {
  Post,
  PostsQuery,
  useGetPostBySlugLazyQuery,
  usePostsLazyQuery,
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
const PostVote = ({ post }: Props) => {
  const [voteMutation, voteResult] = useVoteMutation();
  const [_, { updateQuery: updatePostsQuery }] = usePostsLazyQuery();
  const { user, isLoggedIn } = useUserData();
  const voteValue = useMemo(() => post.myVote?.vote, [post.myVote]);
  const isByUser = post.author.id !== user?.id;
  const submitVote = useCallback(
    (newVote: VoteValue) => {
      const value = newVote === voteValue ? VoteValue.Neutral : newVote;
      const numVotes = voteValue ? post.numVotes : post.numVotes + 1;
      const scoreDiff = voteValue
        ? getNumericVoteValue(voteValue) - getNumericVoteValue(newVote)
        : getNumericVoteValue(newVote);
      const score = post.score + scoreDiff;
      const updatedPost: Post = { ...post, numVotes, score };
      voteMutation({
        variables: {
          postSlug: post.slug,
          authorId: post.author.id,
          value,
        },
      });
      updatePostsQuery &&
        updatePostsQuery((query: PostsQuery) => {
          const newPosts = query.posts
            .filter((p) => p.slug !== post.slug)
            .concat([updatedPost]);
          return {
            posts: newPosts,
          };
        });
    },
    [voteMutation, post]
  );

  const votingEnabled = !isByUser && isLoggedIn && !voteResult.loading;

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
      <span>{post.score}</span>
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
