import type { NextPage } from "next";
import styles from "../../styles/utils.module.css";
import Sidebar from "../../components/Sidebar/Component";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import PostDetail from "../../components/PostDetail/Component";

const PostDetailPage: NextPage = () => {
  return (
    <div className={styles.wideFlexColumn}>
      <MobileMenu />
      <div className={styles.container}>
        <PostDetail />
        <Sidebar />
      </div>
    </div>
  );
};

export default PostDetailPage;
