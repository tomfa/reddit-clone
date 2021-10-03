import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import Sidebar from "../../../components/Sidebar/Component";
import CategoryMenu from "../../../components/CategoryMenu/Component";
import PostDetail from "../../../components/PostDetail/Component";
import {getUrlQueryString} from "../../../lib/hooks";

const PostDetailPage: NextPage = () => {

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CategoryMenu />
      <div className={styles.container}>
        <PostDetail />
        <Sidebar />
      </div>
    </div>
  );
};

export default PostDetailPage;
