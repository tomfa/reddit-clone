import React from "react";
import Empty from "../shared/Empty";
import CommentList from "../CommentList";
import { Comment } from "../../graphql/generated/types";

const PostDetailCommentSection = ({ comments }: { comments: Comment[] }) => (
  <>
    {!comments || comments.length === 0 ? (
      <Empty comments />
    ) : (
      <CommentList comments={comments} />
    )}
  </>
);

export default PostDetailCommentSection;
