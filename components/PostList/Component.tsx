import React from "react";
import styled from "styled-components";
import PostListItem from "./Item";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import {Post, usePostsQuery} from "../../graphql/generated/types";

const List = styled.ul`
  list-style: none;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  width: 100%;
  background-color: var(--color-foreground);

  @media (max-width: 768px) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const PostList = ({ posts, loading }: { posts?: Post[], loading: boolean }) => {

  if (loading) {
    return <List><LoadingIndicatorBox/></List>
  }

  if (!posts || posts.length === 0) {
    return <List><Empty comments={false} /></List>
  }

  return (
    <List>
      {posts.map((post, index) => (
        <PostListItem key={post.slug} {...post} />
      ))}
    </List>
  );
};

export default PostList;
