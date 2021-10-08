import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import PostListItem from "./Item";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import {
  Post,
  PostsQueryVariables,
  usePostsQuery,
} from "../../graphql/generated/types";
import InfiniteScroll from "react-infinite-scroll-component";
import NoMoreResults from "../NoMoreResults";
import ListFilter from "../ListFilter";

const List = styled.ul`
  list-style: none;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  width: 100%;

  @media (max-width: 768px) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

type Props = {
  queryVariables?: PostsQueryVariables;
};
const PostList = ({ queryVariables = {} }: Props) => {
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const {
    data,
    loading,
    fetchMore: fetchMorePosts,
  } = usePostsQuery({
    variables: queryVariables,
  });
  const posts = useMemo(() => data?.posts || [], [data?.posts]);
  useEffect(() => {
    setHasMorePosts(true);
  }, [queryVariables]);

  const fetchMore = useCallback(async () => {
    const oldestPost = (data?.posts || [])
      .map((p) => p.createdAt)
      .reduce((prev, cur) => Math.min(...[prev, cur]), Date.now());
    const result = await fetchMorePosts({
      variables: { ...queryVariables, cursor: new Date(oldestPost) },
    });
    if (result.data.posts.length === 0) {
      setHasMorePosts(false);
    }
  }, [fetchMorePosts, posts, queryVariables]);

  const isEmpty = !posts || !posts.length;

  return (
    <InfiniteScroll
      dataLength={posts?.length || 0}
      next={fetchMore}
      hasMore={hasMorePosts}
      loader={<LoadingIndicatorBox />}
      endMessage={<NoMoreResults>No more posts</NoMoreResults>}
    >
      {loading && isEmpty && <LoadingIndicatorBox />}
      {!loading && isEmpty && <Empty />}
      {!isEmpty && (
        <List>
          {posts.map((post) => (
            <PostListItem key={post.id} {...post} />
          ))}
        </List>
      )}
    </InfiniteScroll>
  );
};

export default PostList;
