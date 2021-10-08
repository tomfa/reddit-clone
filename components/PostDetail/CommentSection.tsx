import React, { useState } from "react";
import CommentList from "../CommentList";
import { Comment } from "../../graphql/generated/types";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import NoMoreResults from "../NoMoreResults";
import InfiniteScroll from "react-infinite-scroll-component";

const PostDetailCommentSection = ({
  numTotalComments,
  comments,
  loading,
  fetchMore,
}: {
  numTotalComments: number;
  comments: Comment[];
  loading: boolean;
  fetchMore: () => void;
}) => {
  return (
    <InfiniteScroll
      dataLength={comments.length}
      next={fetchMore}
      hasMore={comments.length < numTotalComments}
      loader={<LoadingIndicatorBox />}
      endMessage={<NoMoreResults>No more comments</NoMoreResults>}
    >
      <CommentList comments={comments} loading={loading} />
    </InfiniteScroll>
  );
};

export default PostDetailCommentSection;
