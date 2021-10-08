import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import PostList from "../../../components/PostList/Component";
import Sidebar from "../../../components/Sidebar/Component";
import CategoryMenu from "../../../components/CategoryMenu/Component";
import { usePostsQuery } from "../../../graphql/generated/types";
import { getCurrentCategory } from "../../../lib/hooks";
import LoadMoreButton from "../../../components/LoadMoreButton";
import {useCallback, useEffect, useMemo, useState} from "react";

const PostListPage: NextPage = () => {
  const category = getCurrentCategory();
  const [hasLoadedAllPosts, setHasLoadedAllPosts] = useState(false);
  const fetchVariables = useMemo(
    () => ({ category}),
    [category]
  );
  const { data, loading, fetchMore } = usePostsQuery({
    variables: fetchVariables,
  });
  const posts = useMemo(
    () => data?.posts || [],
    [category, data]
  );
  useEffect(() => {
    setHasLoadedAllPosts(false)
  }, [category])

  const onLoadPosts = useCallback(async () => {
    const oldestPost = posts
      .map((p) => p.createdAt)
      .reduce((prev, cur) => Math.min(...[prev, cur]), Date.now());
    const result = await fetchMore({
      variables: { cursor: new Date(oldestPost) },
    });
    if (result.data.posts.length === 0) {
      setHasLoadedAllPosts(true);
    }
  }, [fetchMore, posts]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CategoryMenu />
      <div className={styles.container}>
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <PostList posts={posts} loading={loading} />
          <LoadMoreButton
            hidden={hasLoadedAllPosts || loading || !posts.length}
            onClick={onLoadPosts}
          >
            Load more
          </LoadMoreButton>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default PostListPage;
