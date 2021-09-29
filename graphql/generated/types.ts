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
  input: AddPostInput;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', title: string, slug: string, content: string, category: string, score: number, created: any, views: number, type: PostType, author: { __typename?: 'User', id: string }, votes: Array<{ __typename?: 'UserVote', userId: string, vote: number, id: string }>, comments: Array<{ __typename?: 'Comment', body: string, created: any, author: { __typename?: 'User', id: string } }> } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', title: string, slug: string, content: string, category: string, score: number, created: any, views: number, type: PostType, author: { __typename?: 'User', id: string }, votes: Array<{ __typename?: 'UserVote', userId: string, vote: number, id: string }>, comments: Array<{ __typename?: 'Comment', body: string, created: any, author: { __typename?: 'User', id: string } }> }> };


export const AddPostDocument = gql`
    mutation addPost($input: AddPostInput!) {
  addPost(input: $input) {
    title
    slug
    content
    author {
      id
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
      }
      body
      created
    }
    created
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
export const PostsDocument = gql`
    query posts {
  posts {
    title
    slug
    content
    author {
      id
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
      }
      body
      created
    }
    created
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