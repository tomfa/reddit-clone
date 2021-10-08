import React from "react";
import styled from "styled-components";
import PostVoteContainer from "./Vote/Component";
import PostContent from "./Content";
import { Post } from "../../graphql/generated/types";

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: var(--color-foreground);
`;

type Props = { post: Post; full: boolean };
const PostContainer = ({ full, post }: Props) => (
  <Wrapper>
    <PostVoteContainer post={post} />
    <PostContent showFullPost={full} post={post} />
  </Wrapper>
);

export default PostContainer;
