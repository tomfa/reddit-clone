import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import PostList from "../../components/PostList/Component";
import { usePostsQuery } from "../../graphql/generated/types";
import { getUrlQueryString} from "../../lib/hooks";

const UserDetailPage: NextPage = () => {
  const username = getUrlQueryString("username");
  const { data, loading } = usePostsQuery({
    variables: { username: username },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <h2 style={{ overflow: "hidden", textOverflow: "ellipsis" }}>Posts from {username}</h2>
      <div className={styles.container}>
        <PostList posts={data?.posts} loading={loading} />
      </div>
    </div>
  );
};

export default UserDetailPage;
