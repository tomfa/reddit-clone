import type { NextPage } from "next";
import styles from "../../../styles/utils.module.css";
import PostList from "../../../components/PostList/Component";
import Sidebar from "../../../components/Sidebar/Component";
import MobileMenu from "../../../components/MobileMenu/MobileMenu";
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
    archived: false,
  });

  useEffect(
    () => setQueryVariables((prev) => ({ ...prev, category })),
    [category]
  );

  return (
    <div className={styles.wideFlexColumn}>
      <MobileMenu />
      <div className={styles.wideFlexRow}>
        <div className={styles.wideFlexColumn}>
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
