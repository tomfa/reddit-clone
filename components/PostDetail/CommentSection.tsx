import React, { useCallback, useEffect, useMemo, useState } from "react";
import CommentList from "../CommentList";
import {
  CommentsQuery,
  CommentsQueryVariables,
  useCommentsQuery,
} from "../../graphql/generated/types";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import NoMoreResults from "../NoMoreResults";
import InfiniteScroll from "react-infinite-scroll-component";
import { toCommentCursor } from "../../utils/request.utils";
import style from "../../styles/utils.module.css";
import Empty from "../shared/Empty";

type Props = { queryVariables: CommentsQueryVariables; numComments?: number };
const PostDetailCommentSection = ({ queryVariables, numComments }: Props) => {
  const [hasMore, setHasMore] = useState(numComments !== 0);
  const {
    data: commentsData,
    loading,
    fetchMore,
  } = useCommentsQuery({ variables: queryVariables });
  const comments = useMemo(() => commentsData?.comments || [], [commentsData]);
  useEffect(() => {
    if (hasMore && numComments && numComments <= comments.length) {
      setHasMore(false);
    }
  }, [hasMore, numComments, comments, setHasMore]);
  const getMoreComments = useCallback(async () => {
    const lastComment = comments[comments.length - 1];
    const cursor = toCommentCursor(lastComment);
    if (!fetchMore) {
      return;
    }
    const { data } = await fetchMore({
      variables: {
        ...queryVariables,
        cursor,
      },
    });
    if ((data as unknown as CommentsQuery)?.comments.length === 0) {
      setHasMore(false);
    }
  }, [fetchMore, comments]);

  const isEmpty = !comments || !comments.length;

  return (
    <InfiniteScroll
      dataLength={comments.length}
      next={getMoreComments}
      hasMore={hasMore}
      className={style.wide}
      loader={<LoadingIndicatorBox />}
      endMessage={<NoMoreResults>No more comments</NoMoreResults>}
    >
      {loading && isEmpty && <LoadingIndicatorBox />}
      {!loading && isEmpty && <Empty comments />}
      {!isEmpty && (
        <CommentList
          comments={comments}
          loading={loading}
          displayPostLink={!queryVariables["postId"]}
        />
      )}
    </InfiniteScroll>
  );
};

export default PostDetailCommentSection;
