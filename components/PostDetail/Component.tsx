import React, { useEffect } from "react";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import PostDetailPost from "./Post";
import PostDetailInfoBarContainer from "./InfoBar/Component";
import CommentForm from "../CommentForm/Component";
import { useGetPostBySlugLazyQuery } from "../../graphql/generated/types";
import { getUrlQueryString, useUserData } from "../../lib/hooks";
import { Foreground } from "../Foreground";
import {getUpvotePercentage} from "../../utils/post.utils";

const PostDetail = () => {
  const slug = getUrlQueryString("slug");
  const { isLoggedIn } = useUserData();
  const [getPost, { data, loading }] = useGetPostBySlugLazyQuery();
  const post = data?.getPostBySlug;
  useEffect(() => {
    slug && getPost({ variables: { slug } });
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
    </div>
  );
};

export default PostDetail;
