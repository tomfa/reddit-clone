import { ApolloCache, FetchResult } from "@apollo/client";
import {
  AddCommentMutation,
  AddPostMutation,
  CommentsDocument,
  CommentsQuery,
  PostsDocument,
  PostSort,
  PostsQuery,
  QueryCommentsArgs,
  QueryPostsArgs,
} from "../graphql/generated/types";

export const addPostCacheUpdate = (
  cache: ApolloCache<any>,
  { data }: Omit<FetchResult<AddPostMutation>, "context">
) => {
  const newPost = data?.addPost;
  if (!newPost) {
    return;
  }
  const variblesToUpdate: QueryPostsArgs[] = [
    {
      category: undefined,
      sort: PostSort.Recent,
      archived: false,
    },
    { username: newPost.author.username },
    {
      category: newPost.category,
      sort: PostSort.Recent,
      archived: false,
    },
  ];
  variblesToUpdate.forEach((variables) => {
    const existingPosts = cache.readQuery<PostsQuery>({
      query: PostsDocument,
      variables,
    });
    if (!existingPosts) {
      return;
    }
    cache.writeQuery({
      query: PostsDocument,
      variables,
      data: { posts: [newPost] },
    });
  });
};

export const addCommentCacheUpdate = (
  cache: ApolloCache<any>,
  { data }: Omit<FetchResult<AddCommentMutation>, "context">
) => {
  const newComment = data?.addComment;
  if (!newComment) {
    return;
  }
  const variblesToUpdate: QueryCommentsArgs[] = [
    {
      postId: newComment.post.id,
    },
    {
      username: newComment.author.username,
    },
  ];
  variblesToUpdate.forEach((variables) => {
    const existing = cache.readQuery<CommentsQuery>({
      query: CommentsDocument,
      variables,
    });
    if (!existing) {
      return;
    }
    cache.writeQuery({
      query: CommentsDocument,
      variables,
      data: { comments: [newComment] },
    });
  });
};
