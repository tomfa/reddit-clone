import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import DeleteButton from "../../shared/DeleteButton";
import { useUserData } from "../../../lib/hooks";
import {
  Post,
  PostsQuery,
  usePostsLazyQuery,
  useSetPostArchivedMutation,
} from "../../../graphql/generated/types";
import { getUpvotePercentage } from "../../../utils/post.utils";

const Wrapper = styled.div<{ round?: boolean }>`
  display: flex;
  margin-top: -1px;
  border: 1px solid var(--color-border);
  ${(props) => props.round && "border-radius: 0 0 2px 2px"};
  padding: 8px;
  background-color: var(--color-foreground);
  font-size: 13px;
  color: var(--color-mutedText);

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`;

type Props = {
  post: Post;
};
const PostDetailInfoBar = ({ post }: Props) => {
  const { user, isLoggedIn } = useUserData();
  const [fetchPosts, { updateQuery: updatePostsQuery }] = usePostsLazyQuery();
  const [setPostArchived, { loading }] = useSetPostArchivedMutation();
  const canUpdate = user?.id === post.author.id;
  const upvotePercentage = useMemo(() => getUpvotePercentage(post), [post]);

  const deletePost = useCallback(() => {
    if (loading) {
      return;
    }
    setPostArchived({
      variables: { slug: post.slug, archived: !post.archived },
    });
    updatePostsQuery &&
      updatePostsQuery((query: PostsQuery) => {
        const updatedPost = { ...post, archived: !post.archived };
        const newPosts = query.posts.map((p) =>
          p.slug !== post.slug ? p : updatedPost
        );
        return {
          posts: newPosts,
        };
      });
  }, [post, loading, updatePostsQuery, setPostArchived]);

  return (
    <Wrapper round={!isLoggedIn}>
      <span>{post.views} views</span>
      <span>&nbsp;|&nbsp;</span>
      <span>{upvotePercentage.toFixed(0)}% upvoted</span>
      {canUpdate && (
        <DeleteButton
          onClick={deletePost}
          label={loading ? "..." : post.archived ? "Unarchive" : "Archive"}
        />
      )}
    </Wrapper>
  );
};

export default PostDetailInfoBar;
