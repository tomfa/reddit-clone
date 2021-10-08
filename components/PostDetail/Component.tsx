import React, { useCallback, useEffect, useMemo } from "react";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import PostDetailPost from "./Post";
import PostDetailInfoBarContainer from "./InfoBar/Component";
import CommentForm from "../CommentForm/Component";
import {
  AddCommentInput,
  useAddCommentMutation,
  useCommentsLazyQuery,
  useGetPostByIdLazyQuery,
  Comment,
  CommentsQuery,
} from "../../graphql/generated/types";
import { getUrlQueryString, useUserData } from "../../lib/hooks";
import { Foreground } from "../Foreground";
import { getUpvotePercentage } from "../../utils/post.utils";
import PostDetailCommentSection from "./CommentSection";

const PostDetail = () => {
  const postId = getUrlQueryString("postId");
  const { user, isLoggedIn } = useUserData();
  const [getPost, { data, loading }] = useGetPostByIdLazyQuery();
  const [
    getComments,
    { data: commentsData, loading: commentsLoading, updateQuery },
  ] = useCommentsLazyQuery();
  const post = data?.getPostById;
  const comments = useMemo(() => commentsData?.comments || [], [commentsData]);
  const [addComment, { loading: addCommentLoading }] = useAddCommentMutation();
  useEffect(() => {
    postId && getPost({ variables: { id: postId } });
    postId && getComments({ variables: { postId } });
  }, [postId, getPost]);

  const onSubmitNewComment = useCallback(
    ({ content }: { content: string }) => {
      if (!postId || !user) {
        return;
      }
      const input: AddCommentInput = { content, postId };
      addComment({ variables: { input } }).then((result) => {
        const id = result.data?.addComment.id;
        const tempComment: Comment = {
          body: content,
          createdAt: new Date(),
          id: id || Math.random().toString(),
          author: user,
          postId,
        };
        updateQuery &&
          updateQuery((query: CommentsQuery) => ({
            comments: query.comments.concat([tempComment]),
          }));
      });
    },
    [postId, user, updateQuery]
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
        <Empty comments={false} />
      </Foreground>
    );
  }
  return (
    <div style={{ flexDirection: "column", width: "100%" }}>
      <PostDetailPost post={post} />
      <PostDetailInfoBarContainer post={post} />
      {isLoggedIn && (
        <CommentForm
          loading={addCommentLoading}
          onAddComment={onSubmitNewComment}
        />
      )}
      <PostDetailCommentSection
        comments={comments}
        loading={commentsLoading || addCommentLoading}
      />
    </div>
  );
};

export default PostDetail;
