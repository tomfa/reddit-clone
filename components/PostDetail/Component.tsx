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
  useGetPostBySlugLazyQuery,
  Comment,
  CommentsQuery,
} from "../../graphql/generated/types";
import { getUrlQueryString, useUserData } from "../../lib/hooks";
import { Foreground } from "../Foreground";
import { getUpvotePercentage } from "../../utils/post.utils";
import PostDetailCommentSection from "./CommentSection";

const PostDetail = () => {
  const slug = getUrlQueryString("slug");
  const { user, isLoggedIn } = useUserData();
  const [getPost, { data, loading }] = useGetPostBySlugLazyQuery();
  const [
    getComments,
    { data: commentsData, loading: commentsLoading, updateQuery },
  ] = useCommentsLazyQuery();
  const post = data?.getPostBySlug;
  const comments = useMemo(() => commentsData?.comments || [], [commentsData]);
  const [addComment, { loading: addCommentLoading }] = useAddCommentMutation();
  useEffect(() => {
    slug && getPost({ variables: { slug } });
    slug && getComments({ variables: { postSlug: slug } });
  }, [slug, getPost]);

  const onSubmitNewComment = useCallback(
    ({ content }: { content: string }) => {
      if (!slug || !user) {
        return;
      }
      const input: AddCommentInput = { content, postSlug: slug };
      addComment({ variables: { input } }).then((result) => {
        const id = result.data?.addComment.id;
        const tempComment: Comment = {
          body: content,
          createdAt: new Date(),
          id: id || Math.random().toString(),
          author: user,
          postSlug: slug,
        };
        updateQuery &&
          updateQuery((query: CommentsQuery) => ({
            comments: query.comments.concat([tempComment]),
          }));
      });
    },
    [slug, user, updateQuery]
  );

  if (loading || !slug)
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
