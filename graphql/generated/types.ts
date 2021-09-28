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

export type Comment = {
  __typename?: 'Comment';
  author: User;
  body: Scalars['String'];
  created: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
};


export type MutationAddPostArgs = {
  input: AddPostInput;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  category: Scalars['String'];
  comments: Array<Comment>;
  content: Scalars['String'];
  created: Scalars['Date'];
  score: Scalars['Int'];
  slug: Scalars['String'];
  title: Scalars['String'];
  type: PostType;
  views: Scalars['Int'];
  votes: Array<UserVote>;
};

export enum PostType {
  Link = 'LINK',
  Text = 'TEXT'
}

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
};

export type UserVote = {
  __typename?: 'UserVote';
  id: Scalars['String'];
  userId: Scalars['String'];
  vote: Scalars['Int'];
};

export type AddPostMutationVariables = Exact<{
  addPostInput: AddPostInput;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', title: string, slug: string, category: string } };

export type FindPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', title: string, slug: string, created: any }> };


export const AddPostDocument = gql`
    mutation addPost($addPostInput: AddPostInput!) {
  addPost(input: $addPostInput) {
    title
    slug
    category
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
 *      addPostInput: // value for 'addPostInput'
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
export const FindPostsDocument = gql`
    query findPosts {
  posts {
    title
    slug
    created
  }
}
    `;

/**
 * __useFindPostsQuery__
 *
 * To run a query within a React component, call `useFindPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindPostsQuery(baseOptions?: Apollo.QueryHookOptions<FindPostsQuery, FindPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostsQuery, FindPostsQueryVariables>(FindPostsDocument, options);
      }
export function useFindPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostsQuery, FindPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostsQuery, FindPostsQueryVariables>(FindPostsDocument, options);
        }
export type FindPostsQueryHookResult = ReturnType<typeof useFindPostsQuery>;
export type FindPostsLazyQueryHookResult = ReturnType<typeof useFindPostsLazyQuery>;
export type FindPostsQueryResult = Apollo.QueryResult<FindPostsQuery, FindPostsQueryVariables>;
