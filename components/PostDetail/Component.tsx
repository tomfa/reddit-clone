import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import PostDetailPost from "./Post";
import PostDetailInfoBarContainer from "./InfoBar/Component";
import CommentForm from "../CommentForm/Component";
import {
  AddCommentInput,
  useAddCommentMutation,
  useGetPostByIdLazyQuery,
} from "../../graphql/generated/types";
import { useUrlQueryString, useUserData } from "../../lib/hooks";
import { Foreground } from "../Foreground";
import PostDetailCommentSection from "./CommentSection";
import style from "../../styles/utils.module.css";

const PostDetail = () => {
  const postId = useUrlQueryString("postId");
  const { user, isLoggedIn } = useUserData();
  const [getPost, { data, loading }] = useGetPostByIdLazyQuery();
  const post = data?.getPostById;
  const [addComment, { loading: addCommentLoading }] = useAddCommentMutation();

  useEffect(() => {
    postId && getPost({ variables: { id: postId } });
  }, [postId, getPost]);

  const onSubmitNewComment = useCallback(
    async ({ content }: { content: string }) => {
      if (!postId || !user) {
        return;
      }
      const input: AddCommentInput = { content, postId };
      await addComment({ variables: { input } });
    },
    [postId, user]
  );

  if (loading || !postId)
    return (
      <Foreground>
        <LoadingIndicatorBox />
      </Foreground>
    );
  if (!post) {
    return (
      <Foreground>
        <Empty />
      </Foreground>
    );
  }
  return (
    <div className={style.wideFlexColumn}>
      <PostDetailPost post={post} />
      <PostDetailInfoBarContainer post={post} />
      {isLoggedIn && (
        <CommentForm
          loading={addCommentLoading}
          onAddComment={onSubmitNewComment}
        />
      )}
      <PostDetailCommentSection
        queryVariables={{ postId: post.id }}
        numComments={post.numComments}
      />
    </div>
  );
};

export default PostDetail;
