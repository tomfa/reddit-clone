import React from "react";
import styled from "styled-components";
import PostListItem from "./Item";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import { Post, usePostsQuery } from "../../graphql/generated/types";
import InfiniteScroll from "react-infinite-scroll-component";
import NoMoreResults from "../NoMoreResults";

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
  posts,
  loading,
  fetchMore,
  hasMorePosts,
}: {
  posts?: Post[];
  loading: boolean;
  fetchMore: () => void;
  hasMorePosts: boolean;
}) => {
  if (loading) {
    return <LoadingIndicatorBox />;
  }

  if (!posts || posts.length === 0) {
    return <Empty comments={false} />;
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMore}
      hasMore={hasMorePosts}
      loader={<LoadingIndicatorBox />}
      endMessage={<NoMoreResults>No more posts</NoMoreResults>}
    >
      <List>
        {posts.map((post) => (
          <PostListItem key={post.id} {...post} />
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default PostList;
