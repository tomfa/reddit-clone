import React, { useState } from "react";
import CommentList from "../CommentList";
import { Comment } from "../../graphql/generated/types";
import LoadMoreButton from "../LoadMoreButton";

const PostDetailCommentSection = ({
  comments,
  loading,
  fetchMore,
}: {
  comments: Comment[];
  loading: boolean;
  fetchMore: () => void;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CommentList comments={comments} loading={loading} />
      <LoadMoreButton hidden={loading || !comments.length} onClick={fetchMore}>
        Load more
      </LoadMoreButton>
    </div>
  );
};

export default PostDetailCommentSection;
