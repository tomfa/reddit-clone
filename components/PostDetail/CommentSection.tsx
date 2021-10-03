import React from "react";
import CommentList from "../CommentList";
import { Comment } from "../../graphql/generated/types";

const PostDetailCommentSection = ({
  comments,
  loading,
}: {
  comments: Comment[];
  loading: boolean;
}) => {
  return (
    <CommentList comments={comments} loading={loading} />
  );
};

export default PostDetailCommentSection;
