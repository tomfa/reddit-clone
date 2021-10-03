import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import PostList from "../../../components/PostList/Component";
import Sidebar from "../../../components/Sidebar/Component";
import CategoryMenu from "../../../components/CategoryMenu/Component";
import { usePostsQuery } from "../../../graphql/generated/types";
import { getCurrentCategory } from "../../../lib/hooks";

const PostListPage: NextPage = () => {
  const category = getCurrentCategory();
  const { data, loading } = usePostsQuery({
    variables: { category: (category !== "all" && category) || undefined },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CategoryMenu />
      <div className={styles.container}>
        <PostList posts={data?.posts} loading={loading} />
        <Sidebar />
      </div>
    </div>
  );
};

export default PostListPage;
