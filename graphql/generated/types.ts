import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AddPostInput = {
  category: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
  type: PostType;
};

export type AddUserInput = {
  authId: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  body: Scalars['String'];
  createdAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
  addUser?: Maybe<User>;
  getUser?: Maybe<User>;
};


export type MutationAddPostArgs = {
  input: AddPostInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationGetUserArgs = {
  id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  category: Scalars['String'];
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  published: Scalars['Boolean'];
  score: Scalars['Int'];
  slug: Scalars['String'];
  title: Scalars['String'];
  type: PostType;
  views: Scalars['Int'];
  votes: Array<UserVote>;
};

export enum PostSort {
  Popular = 'POPULAR',
  Recent = 'RECENT'
}

export enum PostType {
  Link = 'LINK',
  Text = 'TEXT'
}

export type Query = {
  __typename?: 'Query';
  getUserById?: Maybe<User>;
  posts: Array<Post>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  category?: Maybe<Scalars['String']>;
  createdAfter?: Maybe<Scalars['Date']>;
  cursor?: Maybe<Scalars['Date']>;
  order?: Maybe<SortOrder>;
  sort?: Maybe<PostSort>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserVote = {
  __typename?: 'UserVote';
  id: Scalars['String'];
  userId: Scalars['String'];
  vote: Scalars['Int'];
};

export type AddPostMutationVariables = Exact<{
  input: AddPostInput;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', id: string, title: string, slug: string, content: string, published: boolean, category: string, score: number, createdAt: any, views: number, type: PostType, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> }, votes: Array<{ __typename?: 'UserVote', userId: string, vote: number, id: string }>, comments: Array<{ __typename?: 'Comment', body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> } }> } };

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: Maybe<{ __typename?: 'User', id: string, username: string, name?: Maybe<string> }> };

export type GetUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserMutation = { __typename?: 'Mutation', getUser?: Maybe<{ __typename?: 'User', id: string, username: string, name?: Maybe<string> }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: Maybe<{ __typename?: 'User', id: string, username: string, name?: Maybe<string> }> };

export type PostsQueryVariables = Exact<{
  category?: Maybe<Scalars['String']>;
  sort?: Maybe<PostSort>;
  order?: Maybe<SortOrder>;
  createdAfter?: Maybe<Scalars['Date']>;
  cursor?: Maybe<Scalars['Date']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, slug: string, content: string, published: boolean, category: string, score: number, createdAt: any, views: number, type: PostType, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> }, votes: Array<{ __typename?: 'UserVote', userId: string, vote: number, id: string }>, comments: Array<{ __typename?: 'Comment', body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> } }> }> };


export const AddPostDocument = gql`
    mutation addPost($input: AddPostInput!) {
  addPost(input: $input) {
    id
    title
    slug
    content
    published
    author {
      id
      username
      name
    }
    category
    score
    votes {
      userId
      vote
      id
    }
    comments {
      author {
        id
        username
        name
      }
      body
      createdAt
    }
    createdAt
    views
    type
  }
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const AddUserDocument = gql`
    mutation addUser($input: AddUserInput!) {
  addUser(input: $input) {
    id
    username
    name
  }
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const GetUserDocument = gql`
    mutation getUser($id: String!) {
  getUser(id: $id) {
    id
    username
    name
  }
}
    `;
export type GetUserMutationFn = Apollo.MutationFunction<GetUserMutation, GetUserMutationVariables>;

/**
 * __useGetUserMutation__
 *
 * To run a mutation, you first call `useGetUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getUserMutation, { data, loading, error }] = useGetUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserMutation(baseOptions?: Apollo.MutationHookOptions<GetUserMutation, GetUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetUserMutation, GetUserMutationVariables>(GetUserDocument, options);
      }
export type GetUserMutationHookResult = ReturnType<typeof useGetUserMutation>;
export type GetUserMutationResult = Apollo.MutationResult<GetUserMutation>;
export type GetUserMutationOptions = Apollo.BaseMutationOptions<GetUserMutation, GetUserMutationVariables>;
export const GetUserByIdDocument = gql`
    query getUserById($id: String!) {
  getUserById(id: $id) {
    id
    username
    name
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const PostsDocument = gql`
    query posts($category: String, $sort: PostSort, $order: SortOrder, $createdAfter: Date, $cursor: Date) {
  posts(
    category: $category
    sort: $sort
    order: $order
    createdAfter: $createdAfter
    cursor: $cursor
  ) {
    id
    title
    slug
    content
    published
    author {
      id
      username
      name
    }
    category
    score
    votes {
      userId
      vote
      id
    }
    comments {
      author {
        id
        username
        name
      }
      body
      createdAt
    }
    createdAt
    views
    type
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      category: // value for 'category'
 *      sort: // value for 'sort'
 *      order: // value for 'order'
 *      createdAfter: // value for 'createdAfter'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;