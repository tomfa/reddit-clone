import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type FieldWrapper<T> = T;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  author: FieldWrapper<User>;
  body: FieldWrapper<Scalars['String']>;
  createdAt: FieldWrapper<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: FieldWrapper<Post>;
  addUser?: Maybe<FieldWrapper<User>>;
  vote?: Maybe<FieldWrapper<Post>>;
};


export type MutationAddPostArgs = {
  input: AddPostInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationVoteArgs = {
  authorId: Scalars['String'];
  postSlug: Scalars['String'];
  value: VoteValue;
};

export type Post = {
  __typename?: 'Post';
  author: FieldWrapper<User>;
  category: FieldWrapper<Scalars['String']>;
  comments: Array<FieldWrapper<Comment>>;
  content: FieldWrapper<Scalars['String']>;
  createdAt: FieldWrapper<Scalars['Date']>;
  myVote?: Maybe<FieldWrapper<UserVote>>;
  numVotes: FieldWrapper<Scalars['Int']>;
  published: FieldWrapper<Scalars['Boolean']>;
  score: FieldWrapper<Scalars['Int']>;
  slug: FieldWrapper<Scalars['String']>;
  title: FieldWrapper<Scalars['String']>;
  type: FieldWrapper<PostType>;
  views: FieldWrapper<Scalars['Int']>;
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
  getPostBySlug?: Maybe<FieldWrapper<Post>>;
  getUserById?: Maybe<FieldWrapper<User>>;
  posts: Array<FieldWrapper<Post>>;
};


export type QueryGetPostBySlugArgs = {
  slug: Scalars['String'];
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
  id: FieldWrapper<Scalars['String']>;
  name?: Maybe<FieldWrapper<Scalars['String']>>;
  username: FieldWrapper<Scalars['String']>;
};

export type UserVote = {
  __typename?: 'UserVote';
  id: FieldWrapper<Scalars['String']>;
  postSlug: FieldWrapper<Scalars['String']>;
  userId: FieldWrapper<Scalars['String']>;
  vote: FieldWrapper<VoteValue>;
};

export enum VoteValue {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddPostInput: AddPostInput;
  AddUserInput: AddUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostSort: PostSort;
  PostType: PostType;
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserVote: ResolverTypeWrapper<UserVote>;
  VoteValue: VoteValue;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddPostInput: AddPostInput;
  AddUserInput: AddUserInput;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  Date: Scalars['Date'];
  Int: Scalars['Int'];
  Mutation: {};
  Post: Post;
  Query: {};
  String: Scalars['String'];
  User: User;
  UserVote: UserVote;
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  author: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  body: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addPost: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationAddPostArgs, 'input'>>;
  addUser: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'input'>>;
  vote: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationVoteArgs, 'authorId' | 'postSlug' | 'value'>>;
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  author: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  category: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  myVote: Resolver<Maybe<ResolversTypes['UserVote']>, ParentType, ContextType>;
  numVotes: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  published: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  score: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['PostType'], ParentType, ContextType>;
  views: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getPostBySlug: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostBySlugArgs, 'slug'>>;
  getUserById: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  posts: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostsArgs, never>>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserVoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserVote'] = ResolversParentTypes['UserVote']> = ResolversObject<{
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postSlug: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote: Resolver<ResolversTypes['VoteValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Comment: CommentResolvers<ContextType>;
  Date: GraphQLScalarType;
  Mutation: MutationResolvers<ContextType>;
  Post: PostResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  UserVote: UserVoteResolvers<ContextType>;
}>;


export type AddPostMutationVariables = Exact<{
  input: AddPostInput;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', title: string, slug: string, content: string, published: boolean, category: string, score: number, numVotes: number, createdAt: any, views: number, type: PostType, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> }, myVote?: Maybe<{ __typename?: 'UserVote', userId: string, vote: VoteValue, id: string, postSlug: string }>, comments: Array<{ __typename?: 'Comment', body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> } }> } };

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: Maybe<{ __typename?: 'User', id: string, username: string, name?: Maybe<string> }> };

export type VoteMutationVariables = Exact<{
  authorId: Scalars['String'];
  postSlug: Scalars['String'];
  value: VoteValue;
}>;


export type VoteMutation = { __typename?: 'Mutation', vote?: Maybe<{ __typename?: 'Post', title: string, slug: string, content: string, published: boolean, category: string, score: number, numVotes: number, createdAt: any, views: number, type: PostType, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> }, myVote?: Maybe<{ __typename?: 'UserVote', userId: string, vote: VoteValue, id: string, postSlug: string }>, comments: Array<{ __typename?: 'Comment', body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> } }> }> };

export type GetPostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostBySlugQuery = { __typename?: 'Query', getPostBySlug?: Maybe<{ __typename?: 'Post', title: string, slug: string, content: string, published: boolean, category: string, score: number, numVotes: number, createdAt: any, views: number, type: PostType, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> }, myVote?: Maybe<{ __typename?: 'UserVote', userId: string, vote: VoteValue, id: string, postSlug: string }>, comments: Array<{ __typename?: 'Comment', body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> } }> }> };

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


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', title: string, slug: string, content: string, published: boolean, category: string, score: number, numVotes: number, createdAt: any, views: number, type: PostType, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> }, myVote?: Maybe<{ __typename?: 'UserVote', userId: string, vote: VoteValue, id: string, postSlug: string }>, comments: Array<{ __typename?: 'Comment', body: string, createdAt: any, author: { __typename?: 'User', id: string, username: string, name?: Maybe<string> } }> }> };


export const AddPostDocument = gql`
    mutation addPost($input: AddPostInput!) {
  addPost(input: $input) {
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
    numVotes
    myVote {
      userId
      vote
      id
      postSlug
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
export const VoteDocument = gql`
    mutation vote($authorId: String!, $postSlug: String!, $value: VoteValue!) {
  vote(authorId: $authorId, postSlug: $postSlug, value: $value) {
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
    numVotes
    myVote {
      userId
      vote
      id
      postSlug
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
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      postSlug: // value for 'postSlug'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const GetPostBySlugDocument = gql`
    query getPostBySlug($slug: String!) {
  getPostBySlug(slug: $slug) {
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
    numVotes
    myVote {
      userId
      vote
      id
      postSlug
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
 * __useGetPostBySlugQuery__
 *
 * To run a query within a React component, call `useGetPostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetPostBySlugQuery, GetPostBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostBySlugQuery, GetPostBySlugQueryVariables>(GetPostBySlugDocument, options);
      }
export function useGetPostBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostBySlugQuery, GetPostBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostBySlugQuery, GetPostBySlugQueryVariables>(GetPostBySlugDocument, options);
        }
export type GetPostBySlugQueryHookResult = ReturnType<typeof useGetPostBySlugQuery>;
export type GetPostBySlugLazyQueryHookResult = ReturnType<typeof useGetPostBySlugLazyQuery>;
export type GetPostBySlugQueryResult = Apollo.QueryResult<GetPostBySlugQuery, GetPostBySlugQueryVariables>;
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
    numVotes
    myVote {
      userId
      vote
      id
      postSlug
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