import React from "react";
import styled from "styled-components";
import PostContainer from "../Post";
import {Post} from "../../graphql/generated/types";

const Item = styled.li`
  :not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.border};
  }
`;

const PostListItem = (props: Post) => (
  <Item>
    <PostContainer {...props} />
  </Item>
);

export default PostListItem;
