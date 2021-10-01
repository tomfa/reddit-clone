import React from "react";
import styled from "styled-components";
import PostContainer from "../Post";
import { Post } from "../../graphql/generated/types";

const Item = styled.li`
  :not(:first-child) {
    border-top: 1px solid var(--color-border);
  }
`;

const PostListItem = (post: Post) => (
  <Item>
    <PostContainer post={post} full={false} />
  </Item>
);

export default PostListItem;
