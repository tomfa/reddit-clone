import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import PostListItem from "./Item";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import {
  Post,
  PostsQuery,
  PostsQueryVariables,
  usePostsQuery,
} from "../../graphql/generated/types";
import InfiniteScroll from "react-infinite-scroll-component";
import NoMoreResults from "../NoMoreResults";
import ListFilter from "../ListFilter";
import { toPostCursor } from "../../utils/request.utils";
import { toast } from "react-hot-toast";
import { getLongestUrl } from "../../utils/string.utils";
import Button from "../shared/Button";

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
    error,
    fetchMore: fetchMorePosts,
  } = usePostsQuery({
    variables: queryVariables,
  });
  const posts = useMemo(() => data?.posts || [], [data?.posts]);

  useEffect(() => {
    if (!error?.message) {
      return;
    }
    const errorUrl = getLongestUrl(error.message);
    console.log(errorUrl);
    error &&
      toast.error(
        (t) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              wordBreak: "break-word",
            }}
          >
            {error.message}{" "}
            {errorUrl && (
              <a
                style={{
                  textDecoration: "underline",
                  alignSelf: "center",
                  marginTop: "0.3rem",
                }}
                href={errorUrl}
                target={"_blank"}
                rel="noreferrer"
              >
                {errorUrl}
              </a>
            )}
            <Button
              style={{ alignSelf: "flex-end", marginTop: "0.3rem" }}
              onClick={() => toast.dismiss(t.id)}
            >
              Close
            </Button>
          </div>
        ),
        { duration: Number.POSITIVE_INFINITY }
      );
  }, [error]);

  useEffect(() => {
    setHasMorePosts(true);
  }, [queryVariables]);

  const fetchMore = useCallback(async () => {
    const lastPost = posts[posts.length - 1];
    const cursor = toPostCursor(lastPost);
    const { data } = await fetchMorePosts({
      variables: { ...queryVariables, cursor },
    });
    if ((data as unknown as PostsQuery)?.posts.length === 0) {
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
