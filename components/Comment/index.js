import React from "react";
import styled from "styled-components";
import CommentDetailContainer from "./Detail/Container";
import CommentContent from "./Content";

const Wrapper = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background-color: var(--color-foreground);

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const Comment = ({ body, ...details }) => (
  <Wrapper>
    <CommentDetailContainer {...details} />
    <CommentContent>{body}</CommentContent>
  </Wrapper>
);

export default Comment;
