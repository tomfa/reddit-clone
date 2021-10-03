import React from "react";
import Empty from "../shared/Empty";
import CommentList from "../CommentList";
import { Comment } from "../../graphql/generated/types";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";

const PostDetailCommentSection = ({
  comments,
  loading,
}: {
  comments: Comment[];
  loading: boolean;
}) => {
  if (loading) {
    return <LoadingIndicatorBox />;
  }
  return (
    <>
      {!comments || comments.length === 0 ? (
        <Empty comments />
      ) : (
        <CommentList comments={comments} />
      )}
    </>
  );
};

export default PostDetailCommentSection;
