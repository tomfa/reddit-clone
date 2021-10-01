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

const renderContent = ({ post, showFullPost }: Props) => {
  if (post.type === PostType.Text && showFullPost) {
    return <PostContentFullText>{post.content}</PostContentFullText>;
  }
  return <PostContentPreview>{post.content}</PostContentPreview>;
};

type Props = { showFullPost: boolean; post: Post };
const PostContent = ({ post, showFullPost }: Props) => (
  <Wrapper>
    <PostContentTitle post={post} full={showFullPost} />
    {renderContent({ post, showFullPost })}
    <PostContentDetail post={post} />
  </Wrapper>
);

export default PostContent;
