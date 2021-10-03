import React, {useEffect, useMemo} from "react";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import PostDetailPost from "./Post";
import PostDetailInfoBarContainer from "./InfoBar/Component";
import CommentForm from "../CommentForm/Component";
import {
  useCommentsLazyQuery,
  useGetPostBySlugLazyQuery
} from "../../graphql/generated/types";
import { getUrlQueryString, useUserData } from "../../lib/hooks";
import { Foreground } from "../Foreground";
import {getUpvotePercentage} from "../../utils/post.utils";
import PostDetailCommentSection from "./CommentSection";

const PostDetail = () => {
  const slug = getUrlQueryString("slug");
  const { isLoggedIn } = useUserData();
  const [getPost, { data, loading }] = useGetPostBySlugLazyQuery();
  const [getComments, { data: commentsData, loading: commentsLoading, }] = useCommentsLazyQuery();
  const post = data?.getPostBySlug;
  const comments = useMemo(() => commentsData?.comments || [], [commentsData])
  useEffect(() => {
    slug && getPost({ variables: { slug } });
    slug && getComments({ variables: { postSlug: slug } });
  }, [slug, getPost]);

  if (loading || !slug || !post)
    return (
      <Foreground>
        <LoadingIndicatorBox />
      </Foreground>
    );
  if (!post)
    return (
      <Foreground>
        <Empty comments={false} />
      </Foreground>
    );
  return (
    <div style={{ flexDirection: 'column', width: '100%'}}>
      <PostDetailPost post={post} />
      <PostDetailInfoBarContainer
        slug={post.slug}
        numViews={post.views}
        upvotePercentage={getUpvotePercentage(post)}
        author={post.author}
      />
      {isLoggedIn && <CommentForm slug={post.slug} />}
      <PostDetailCommentSection comments={comments} />
    </div>
  );
};

export default PostDetail;
