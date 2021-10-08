import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import PostList from "../../components/PostList/Component";
import { usePostsQuery } from "../../graphql/generated/types";
import { useUrlQueryString } from "../../lib/hooks";
import React, { useCallback, useState } from "react";
import ListFilter from "../../components/ListFilter";

const UserDetailPage: NextPage = () => {
  const username = useUrlQueryString("username");

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ListFilter header={`/u/${username}`} hideFilters />
      <PostList queryVariables={{ username }} />
    </div>
  );
};

export default UserDetailPage;
