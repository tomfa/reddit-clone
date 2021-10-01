import React from "react";
import styled from "styled-components";
import PostListItem from "./Item";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import { usePostsQuery } from "../../graphql/generated/types";

const List = styled.ul`
  list-style: none;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const PostList = () => {
  const { data, loading } = usePostsQuery();

  if (loading) {
    return <LoadingIndicatorBox/>
  }

  if (!data?.posts || data?.posts.length === 0) {
    return <Empty comments={false} />
  }

  console.log(data.posts)

  return (
    <List>
      {data?.posts.map((post, index) => (
        <PostListItem key={post.id} {...post} />
      ))}
    </List>
  );
};

export default PostList;
