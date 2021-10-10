import { ApolloCache, FetchResult } from "@apollo/client";
import {
  AddPostMutation,
  PostsDocument,
  PostSort,
  PostsQuery,
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
