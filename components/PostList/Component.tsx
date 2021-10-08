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
  overflow: hidden;

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
}: {
  header?: string;
  posts?: Post[];
  loading: boolean;
  fetchMore?: () => void;
  hasMorePosts: boolean;
}) => {
  const isEmpty = !posts || !posts.length;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ListFilter header={header} />
      <InfiniteScroll
        dataLength={posts?.length || 0}
        next={fetchMore}
        hasMore={hasMorePosts}
        loader={<LoadingIndicatorBox />}
        endMessage={<NoMoreResults>No more posts</NoMoreResults>}
      >
        {isEmpty && <Empty />}
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
