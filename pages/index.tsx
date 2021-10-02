import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import PostList from "../components/PostList/Component";
import Sidebar from "../components/Sidebar/Component";
import CategoryMenu from "../components/CategoryMenu/Component";

const Home: NextPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CategoryMenu />
      <div className={styles.container}>
        <PostList />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
