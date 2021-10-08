import React from "react";
import styled from "styled-components";
import CommentListItem from "./Item";
import { Comment } from "../../graphql/generated/types";

const List = styled.ul`
  margin-top: 16px;
  list-style: none;
`;

const loadingComment: Comment = {
  id: "...",
  author: {
    id: "...",
    name: "...",
    username: "Loading...",
  },
  body: "...",
  createdAt: new Date(),
  postId: "...",
};

const CommentList = ({
  comments,
  loading,
}: {
  comments: Comment[];
  loading: boolean;
}) => {
  return (
    comments && (
      <List>
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
        {loading && (
          <CommentListItem key={"loading"} comment={loadingComment} />
        )}
      </List>
    )
  );
};

export default CommentList;
