import React from "react";
import styled from "styled-components";
import PostContentTitle from "./Title";
import PostContentPreview from "./Preview";
import PostContentFullText from "./FullText";
import PostContentDetail from "./Detail";
import { Post, PostType } from "../../../graphql/generated/types";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: 1px solid var(--color-border);
  padding: 8px;
  min-width: 0;
`;

type Props = { showFullPost: boolean; post: Post };
const PostContent = ({ post, showFullPost }: Props) => {
  const previewOnly = post.type === PostType.Link || !showFullPost;
  return (
    <Wrapper>
      <PostContentTitle post={post} full={showFullPost} />
      {previewOnly && <PostContentPreview>{post.content}</PostContentPreview>}
      {!previewOnly && (
        <PostContentFullText>{post.content}</PostContentFullText>
      )}
      <PostContentDetail post={post} />
    </Wrapper>
  );
};

export default PostContent;
