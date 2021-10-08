import React from "react";
import styled from "styled-components";
import PostListItem from "./Item";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import { Post, usePostsQuery } from "../../graphql/generated/types";
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

const PostList = ({
  header,
  posts,
  loading,
  fetchMore = () => {},
  hasMorePosts = false,
  hideFilters,
}: {
  header?: string;
  posts?: Post[];
  loading: boolean;
  fetchMore?: () => void;
  hasMorePosts: boolean;
  hideFilters?: boolean;
}) => {
  const isEmpty = !posts || !posts.length;

  // TODO: Get the post fetching in here, please.
  // Add week/day/month/year/alltime to Listfilter time dropdown
  // Get the filtering to work
  // Extract the list headers own component?

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ListFilter header={header} hideFilters={hideFilters} />
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
    </div>
  );
};

export default PostList;
