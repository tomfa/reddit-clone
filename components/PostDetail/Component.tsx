import React, { useEffect, useMemo } from "react";
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

  const onSubmitNewComment = ({ content }: { content: string }) => {
    if (!slug || !user) {
      return;
    }
    const input: AddCommentInput = { content, postSlug: slug };
    const tempComment: Comment = {
      body: content,
      createdAt: new Date(),
      id: Math.random().toString(), // Temporary ID
      author: {...user, id: 'deleting-this-comment-wont-work'},
      postSlug: slug,
    };
    addComment({ variables: { input } });
    updateQuery &&
      updateQuery((query: CommentsQuery) => ({
        comments: query.comments.concat([tempComment]),
      }));
  };

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
      <PostDetailInfoBarContainer
        slug={post.slug}
        numViews={post.views}
        upvotePercentage={getUpvotePercentage(post)}
        author={post.author}
      />
      {isLoggedIn && (
        <CommentForm
          loading={addCommentLoading}
          onAddComment={onSubmitNewComment}
        />
      )}
      <PostDetailCommentSection comments={comments} loading={commentsLoading} />
    </div>
  );
};

export default PostDetail;
