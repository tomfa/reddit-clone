import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import PostList from "../../../components/PostList/Component";
import Sidebar from "../../../components/Sidebar/Component";
import CategoryMenu from "../../../components/CategoryMenu/Component";
import { useCurrentCategory } from "../../../lib/hooks";
import ListFilter from "../../../components/ListFilter";
import React, { useState } from "react";
import {
  PostSort,
  PostsQueryVariables,
} from "../../../graphql/generated/types";

const PostListPage: NextPage = () => {
  const category = useCurrentCategory();
  const [queryVariables, setQueryVariables] = useState<PostsQueryVariables>({
    category: undefined,
    sort: PostSort.Recent,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CategoryMenu />
      <div className={styles.container}>
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <ListFilter
            header={`/a/${category || "all"}`}
            onChange={(args) => {
              const newQueryFilter = { ...queryVariables, ...args };
              const hasChanged =
                JSON.stringify(newQueryFilter) !==
                JSON.stringify(queryVariables);
              if (hasChanged) {
                console.log("from", queryVariables, "to", args);
                return setQueryVariables(newQueryFilter);
              } else {
                console.log("nochange");
              }
            }}
          />
          <PostList queryVariables={queryVariables} />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default PostListPage;
