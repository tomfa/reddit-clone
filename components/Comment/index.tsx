import React from "react";
import styled from "styled-components";
import CommentDetailContainer from "./Detail/Component";
import CommentContent from "./Content";
import { Comment } from "../../graphql/generated/types";

const Wrapper = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background-color: var(--color-foreground);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

type Props = {
  comment: Comment;
  displayPostInfo?: boolean;
};
const CommentComponent = ({ comment, displayPostInfo }: Props) => (
  <Wrapper>
    <CommentDetailContainer
      comment={comment}
      displayPostInfo={displayPostInfo}
    />
    <CommentContent>{comment.body}</CommentContent>
  </Wrapper>
);

export default CommentComponent;
