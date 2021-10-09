import type { NextPage } from "next";
import React from "react";
import PostList from "../../../components/PostList/Component";
import styles from "../../../styles/utils.module.css";
import { useUrlQueryString } from "../../../lib/hooks";
import ListFilter from "../../../components/ListFilter";
import MobileMenu from "../../../components/MobileMenu/MobileMenu";
import { ROUTES } from "../../../utils/routes.utils";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar/Component";

const UserDetailPage: NextPage = () => {
  const username = useUrlQueryString("username");
  const router = useRouter();
  const options = [
    { value: router.asPath, label: "posts" },
    {
      value: ROUTES.USER_COMMENTS({ username: username || "" }),
      label: "comments",
    },
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
          <PostList queryVariables={{ username }} />
        </div>
        <Sidebar options={options} selected={router.asPath} header={username} />
      </div>
    </div>
  );
};

export default UserDetailPage;
