import React from "react";
import styled from "styled-components";
import CommentComponent from "../Comment";
import {Comment} from "../../graphql/generated/types";

const Item = styled.li`
  margin-bottom: 8px;
`;

const CommentListItem = (props: { comment: Comment }) => (
  <Item>
    <CommentComponent {...props} />
  </Item>
);

export default CommentListItem;
