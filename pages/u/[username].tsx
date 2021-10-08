import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import PostList from "../../components/PostList/Component";
import { usePostsQuery } from "../../graphql/generated/types";
import { useUrlQueryString } from "../../lib/hooks";
import { useCallback, useState } from "react";

const UserDetailPage: NextPage = () => {
  const username = useUrlQueryString("username");
  const [hasLoadedAllPosts, setHasLoadedAllPosts] = useState(false);
  const { data, loading, fetchMore } = usePostsQuery({
    variables: { username: username },
  });

  const onLoadPosts = useCallback(async () => {
    const oldestPost = (data?.posts || [])
      .map((p) => p.createdAt)
      .reduce((prev, cur) => Math.min(...[prev, cur]), Date.now());
    const result = await fetchMore({
      variables: { cursor: new Date(oldestPost) },
    });
    if (result.data.posts.length === 0) {
      setHasLoadedAllPosts(true);
    }
  }, [fetchMore, data?.posts]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className={styles.container}>
        <PostList
          header={`/u/${username}`}
          posts={data?.posts}
          loading={loading}
          fetchMore={onLoadPosts}
          hasMorePosts={!hasLoadedAllPosts}
          hideFilters
        />
      </div>
    </div>
  );
};

export default UserDetailPage;
