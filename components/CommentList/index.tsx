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
  post: {
    id: "...",
    title: "...",
  },
};

const CommentList = ({
  comments,
  loading,
  displayPostLink = false,
}: {
  comments: Comment[];
  loading: boolean;
  displayPostLink: boolean;
}) => {
  return (
    <List>
      {comments &&
        comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            displayPostInfo={displayPostLink}
          />
        ))}
      {!comments ||
        (loading && (
          <CommentComponent key={"loading"} comment={loadingComment} />
        ))}
    </List>
  );
};

export default CommentList;
