import React, {useMemo, useState} from "react";
import styled from "styled-components";
import PostVoteUpvote from "./Upvote";
import PostVoteDownvote from "./Downvote";
import { Post, User, UserVote } from "../../../graphql/generated/types";
import { useUserData } from "../../../lib/hooks";
import { useSession } from "next-auth/client";

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
  const { user, isLoggedIn } = useUserData();
  const [extraPoint, setExtraPoint] = useState(0);
  const isByUser = post.author.id !== user?.id;
  const existingVote = useMemo(
    () => post.votes.find((v) => v.userId === user?.id),
    [post, user]
  );
  const upvote = () => {
    // TODO: Send to server
    setExtraPoint(1)
  };
  const downvote = () => {
    // TODO: Send to server
    setExtraPoint(-1)
  };

  return (
    <Wrapper>
      <PostVoteUpvote
        canVote={!isByUser && isLoggedIn}
        didVote={!!existingVote && existingVote.vote > 0}
        onClick={upvote}
      />
      <span>{post.score + extraPoint}</span>
      <PostVoteDownvote
        canVote={!isByUser && isLoggedIn}
        didVote={!!existingVote && existingVote.vote < 0}
        onClick={downvote}
      />
    </Wrapper>
  );
};

export default PostVote;
