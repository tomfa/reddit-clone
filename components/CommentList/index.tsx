import React from "react";
import styled from "styled-components";
import CommentListItem from "./Item";
import { Comment } from "../../graphql/generated/types";

const List = styled.ul`
  margin-top: 16px;
  list-style: none;
`;

const CommentList = ({ comments }: { comments: Comment[] }) => {
  console.log(comments);
  return (
    comments && (
      <List>
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </List>
    )
  );
};

export default CommentList;
