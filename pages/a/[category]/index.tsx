import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import PostList from "../../../components/PostList/Component";
import Sidebar from "../../../components/Sidebar/Component";
import CategoryMenu from "../../../components/CategoryMenu/Component";
import { useCurrentCategory } from "../../../lib/hooks";
import ListFilter from "../../../components/ListFilter";
import React, { useEffect, useState } from "react";
import {
  PostSort,
  PostsQueryVariables,
} from "../../../graphql/generated/types";
import { shallowEqual } from "../../../utils/object.utils";

const PostListPage: NextPage = () => {
  const category = useCurrentCategory();
  const [queryVariables, setQueryVariables] = useState<PostsQueryVariables>({
    category,
    sort: PostSort.Recent,
  });

  useEffect(
    () => setQueryVariables((prev) => ({ ...prev, category })),
    [category]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CategoryMenu />
      <div className={styles.container}>
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <ListFilter
            header={`/a/${category || "all"}`}
            onChange={(filter) => {
              const newQueryFilter = { ...queryVariables, ...filter };
              if (shallowEqual(newQueryFilter, queryVariables)) {
                return;
              }
              return setQueryVariables(newQueryFilter);
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
