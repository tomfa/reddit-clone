import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import PostList from "../components/PostList/Component";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PostList />
    </div>
  );
};

export default Home;
