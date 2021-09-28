import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useFindPostsQuery } from "../graphql/generated/types";
import * as dateScalar from "../graphql/date.scalar";
import { Loader } from "../components/Loader";
import PostList from "../components/PostList/Component";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PostList />
    </div>
  );
};

export default Home;
