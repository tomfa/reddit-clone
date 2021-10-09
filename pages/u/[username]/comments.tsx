import type { NextPage } from "next";
import React from "react";
import { useUrlQueryString } from "../../../lib/hooks";
import ListFilter from "../../../components/ListFilter";
import PostDetailCommentSection from "../../../components/PostDetail/CommentSection";
import styles from "../../../styles/utils.module.css";
import MobileMenu from "../../../components/MobileMenu/MobileMenu";
import Sidebar from "../../../components/Sidebar/Component";
import { ROUTES } from "../../../utils/routes.utils";
import { useRouter } from "next/router";
import PostList from "../../../components/PostList/Component";

const UserCommentsPage: NextPage = () => {
  const router = useRouter();
  const username = useUrlQueryString("username");
  const options = [
    { value: ROUTES.USER({ username: username || "" }), label: "posts" },
    { value: router.asPath, label: "comments" },
  ];

  return (
    <div className={styles.wideFlexColumn}>
      <MobileMenu
        options={options}
        selected={router.asPath}
        onSelect={(url) => router.push(url)}
      />
      <div className={styles.wideFlexRow}>
        <div className={styles.wideFlexColumn}>
          <ListFilter header={`/u/${username}`} hideFilters />
          <PostDetailCommentSection queryVariables={{ username }} />
        </div>
        <Sidebar options={options} selected={router.asPath} header={username} />
      </div>
    </div>
  );
};

export default UserCommentsPage;
