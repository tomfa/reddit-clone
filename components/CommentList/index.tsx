import React from "react";
import styled from "styled-components";
import { Comment } from "../../graphql/generated/types";
import CommentComponent from "../Comment";

const List = styled.ul`
  margin-top: 0;
  list-style: none;
  width: 100%;
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
    <List>
      {comments &&
        comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      {!comments ||
        (loading && (
          <CommentComponent key={"loading"} comment={loadingComment} />
        ))}
    </List>
  );
};

export default CommentList;
