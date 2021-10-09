import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type FieldWrapper<T> = T;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AddCommentInput = {
  content: Scalars["String"];
  postId: Scalars["String"];
};

export type AddPostInput = {
  category: Scalars["String"];
  content: Scalars["String"];
  title: Scalars["String"];
  type: PostType;
};

export type AddUserInput = {
  authId: Scalars["String"];
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type Comment = {
  __typename?: "Comment";
  author: FieldWrapper<User>;
  body: FieldWrapper<Scalars["String"]>;
  createdAt: FieldWrapper<Scalars["Date"]>;
  id: FieldWrapper<Scalars["String"]>;
  post: FieldWrapper<PostDisplayData>;
};

export type CommentCursor = {
  createdAt: Scalars["Date"];
  id: Scalars["String"];
  postId: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addComment: FieldWrapper<Comment>;
  addPost: FieldWrapper<Post>;
  addUser?: Maybe<FieldWrapper<User>>;
  setPostArchived?: Maybe<FieldWrapper<Post>>;
  vote?: Maybe<FieldWrapper<Post>>;
};

export type MutationAddCommentArgs = {
  input: AddCommentInput;
};

export type MutationAddPostArgs = {
  input: AddPostInput;
};

export type MutationAddUserArgs = {
  input: AddUserInput;
};

export type MutationSetPostArchivedArgs = {
  archived: Scalars["Boolean"];
  id: Scalars["String"];
};

export type MutationVoteArgs = {
  authorId: Scalars["String"];
  postId: Scalars["String"];
  value: VoteValue;
};

export type Post = {
  __typename?: "Post";
  archived: FieldWrapper<Scalars["Boolean"]>;
  author: FieldWrapper<User>;
  category: FieldWrapper<Scalars["String"]>;
  content: FieldWrapper<Scalars["String"]>;
  createdAt: FieldWrapper<Scalars["Date"]>;
  id: FieldWrapper<Scalars["String"]>;
  myVote?: Maybe<FieldWrapper<UserVote>>;
  numComments: FieldWrapper<Scalars["Int"]>;
  numVotes: FieldWrapper<Scalars["Int"]>;
  published: FieldWrapper<Scalars["Boolean"]>;
  score: FieldWrapper<Scalars["Int"]>;
  slug: FieldWrapper<Scalars["String"]>;
  title: FieldWrapper<Scalars["String"]>;
  type: FieldWrapper<PostType>;
};

export type PostCursor = {
  createdAt: Scalars["Date"];
  id: Scalars["String"];
  numComments: Scalars["Int"];
  numVotes: Scalars["Int"];
  score: Scalars["Int"];
};

export type PostDisplayData = {
  __typename?: "PostDisplayData";
  id: FieldWrapper<Scalars["String"]>;
  title: FieldWrapper<Scalars["String"]>;
};

export enum PostSort {
  Popular = "POPULAR",
  Recent = "RECENT",
}

export enum PostType {
  Link = "LINK",
  Text = "TEXT",
}

export type Query = {
  __typename?: "Query";
  comments: Array<FieldWrapper<Comment>>;
  getPostById?: Maybe<FieldWrapper<Post>>;
  getUserById?: Maybe<FieldWrapper<User>>;
  posts: Array<FieldWrapper<Post>>;
};

export type QueryCommentsArgs = {
  cursor?: Maybe<CommentCursor>;
  postId?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type QueryGetPostByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetUserByIdArgs = {
  id: Scalars["String"];
};

export type QueryPostsArgs = {
  archived?: Maybe<Scalars["Boolean"]>;
  category?: Maybe<Scalars["String"]>;
  cursor?: Maybe<PostCursor>;
  month?: Maybe<Scalars["Int"]>;
  order?: Maybe<SortOrder>;
  sort?: Maybe<PostSort>;
  username?: Maybe<Scalars["String"]>;
  week?: Maybe<Scalars["Int"]>;
  year?: Maybe<Scalars["Int"]>;
};

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type User = {
  __typename?: "User";
  id: FieldWrapper<Scalars["String"]>;
  name?: Maybe<FieldWrapper<Scalars["String"]>>;
  username: FieldWrapper<Scalars["String"]>;
};

export type UserVote = {
  __typename?: "UserVote";
  id: FieldWrapper<Scalars["String"]>;
  postId: FieldWrapper<Scalars["String"]>;
  userId: FieldWrapper<Scalars["String"]>;
  vote: FieldWrapper<VoteValue>;
};

export enum VoteValue {
  Negative = "NEGATIVE",
  Neutral = "NEUTRAL",
  Positive = "POSITIVE",
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddCommentInput: AddCommentInput;
  AddPostInput: AddPostInput;
  AddUserInput: AddUserInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentCursor: CommentCursor;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostCursor: PostCursor;
  PostDisplayData: ResolverTypeWrapper<PostDisplayData>;
  PostSort: PostSort;
  PostType: PostType;
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars["String"]>;
  User: ResolverTypeWrapper<User>;
  UserVote: ResolverTypeWrapper<UserVote>;
  VoteValue: VoteValue;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddCommentInput: AddCommentInput;
  AddPostInput: AddPostInput;
  AddUserInput: AddUserInput;
  Boolean: Scalars["Boolean"];
  Comment: Comment;
  CommentCursor: CommentCursor;
  Date: Scalars["Date"];
  Int: Scalars["Int"];
  Mutation: {};
  Post: Post;
  PostCursor: PostCursor;
  PostDisplayData: PostDisplayData;
  Query: {};
  String: Scalars["String"];
  User: User;
  UserVote: UserVote;
}>;

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = ResolversObject<{
  author: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  body: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  post: Resolver<ResolversTypes["PostDisplayData"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  addComment: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, "input">
  >;
  addPost: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationAddPostArgs, "input">
  >;
  addUser: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddUserArgs, "input">
  >;
  setPostArchived: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetPostArchivedArgs, "archived" | "id">
  >;
  vote: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<MutationVoteArgs, "authorId" | "postId" | "value">
  >;
}>;

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = ResolversObject<{
  archived: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  author: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  category: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  content: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  myVote: Resolver<Maybe<ResolversTypes["UserVote"]>, ParentType, ContextType>;
  numComments: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  numVotes: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  published: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  score: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  slug: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type: Resolver<ResolversTypes["PostType"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDisplayDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PostDisplayData"] = ResolversParentTypes["PostDisplayData"]
> = ResolversObject<{
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  comments: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentsArgs, never>
  >;
  getPostById: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPostByIdArgs, "id">
  >;
  getUserById: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByIdArgs, "id">
  >;
  posts: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPostsArgs, never>
  >;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserVoteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserVote"] = ResolversParentTypes["UserVote"]
> = ResolversObject<{
  id: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  postId: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userId: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  vote: Resolver<ResolversTypes["VoteValue"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Comment: CommentResolvers<ContextType>;
  Date: GraphQLScalarType;
  Mutation: MutationResolvers<ContextType>;
  Post: PostResolvers<ContextType>;
  PostDisplayData: PostDisplayDataResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  UserVote: UserVoteResolvers<ContextType>;
}>;

export type AddCommentMutationVariables = Exact<{
  input: AddCommentInput;
}>;

export type AddCommentMutation = {
  __typename?: "Mutation";
  addComment: {
    __typename?: "Comment";
    id: string;
    body: string;
    createdAt: any;
    post: { __typename?: "PostDisplayData"; id: string; title: string };
    author: {
      __typename?: "User";
      id: string;
      username: string;
      name?: Maybe<string>;
    };
  };
};

export type AddPostMutationVariables = Exact<{
  input: AddPostInput;
}>;

export type AddPostMutation = {
  __typename?: "Mutation";
  addPost: {
    __typename?: "Post";
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    archived: boolean;
    category: string;
    score: number;
    numVotes: number;
    numComments: number;
    createdAt: any;
    type: PostType;
    author: {
      __typename?: "User";
      id: string;
      username: string;
      name?: Maybe<string>;
    };
    myVote?: Maybe<{
      __typename?: "UserVote";
      userId: string;
      vote: VoteValue;
      id: string;
      postId: string;
    }>;
  };
};

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;

export type AddUserMutation = {
  __typename?: "Mutation";
  addUser?: Maybe<{
    __typename?: "User";
    id: string;
    username: string;
    name?: Maybe<string>;
  }>;
};

export type SetPostArchivedMutationVariables = Exact<{
  id: Scalars["String"];
  archived: Scalars["Boolean"];
}>;

export type SetPostArchivedMutation = {
  __typename?: "Mutation";
  setPostArchived?: Maybe<{
    __typename?: "Post";
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    archived: boolean;
    category: string;
    score: number;
    numVotes: number;
    numComments: number;
    createdAt: any;
    type: PostType;
    author: {
      __typename?: "User";
      id: string;
      username: string;
      name?: Maybe<string>;
    };
    myVote?: Maybe<{
      __typename?: "UserVote";
      userId: string;
      vote: VoteValue;
      id: string;
      postId: string;
    }>;
  }>;
};

export type VoteMutationVariables = Exact<{
  authorId: Scalars["String"];
  postId: Scalars["String"];
  value: VoteValue;
}>;

export type VoteMutation = {
  __typename?: "Mutation";
  vote?: Maybe<{
    __typename?: "Post";
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    archived: boolean;
    category: string;
    score: number;
    numVotes: number;
    numComments: number;
    createdAt: any;
    type: PostType;
    author: {
      __typename?: "User";
      id: string;
      username: string;
      name?: Maybe<string>;
    };
    myVote?: Maybe<{
      __typename?: "UserVote";
      userId: string;
      vote: VoteValue;
      id: string;
      postId: string;
    }>;
  }>;
};

export type CommentsQueryVariables = Exact<{
  postId?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  cursor?: Maybe<CommentCursor>;
}>;

export type CommentsQuery = {
  __typename?: "Query";
  comments: Array<{
    __typename?: "Comment";
    id: string;
    body: string;
    createdAt: any;
    post: { __typename?: "PostDisplayData"; id: string; title: string };
    author: {
      __typename?: "User";
      id: string;
      username: string;
      name?: Maybe<string>;
    };
  }>;
};

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetPostByIdQuery = {
  __typename?: "Query";
  getPostById?: Maybe<{
    __typename?: "Post";
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    archived: boolean;
    category: string;
    score: number;
    numVotes: number;
    numComments: number;
    createdAt: any;
    type: PostType;
    author: {
      __typename?: "User";
      id: string;
      username: string;
      name?: Maybe<string>;
    };
    myVote?: Maybe<{
      __typename?: "UserVote";
      userId: string;
      vote: VoteValue;
      id: string;
      postId: string;
    }>;
  }>;
};

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetUserByIdQuery = {
  __typename?: "Query";
  getUserById?: Maybe<{
    __typename?: "User";
    id: string;
    username: string;
    name?: Maybe<string>;
  }>;
};

export type PostsQueryVariables = Exact<{
  category?: Maybe<Scalars["String"]>;
  sort?: Maybe<PostSort>;
  username?: Maybe<Scalars["String"]>;
  archived?: Maybe<Scalars["Boolean"]>;
  order?: Maybe<SortOrder>;
  year?: Maybe<Scalars["Int"]>;
  month?: Maybe<Scalars["Int"]>;
  week?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<PostCursor>;
}>;

export type PostsQuery = {
  __typename?: "Query";
  posts: Array<{
    __typename?: "Post";
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    archived: boolean;
    category: string;
    score: number;
    numVotes: number;
    numComments: number;
    createdAt: any;
    type: PostType;
    author: {
      __typename?: "User";
      id: string;
      username: string;
      name?: Maybe<string>;
    };
    myVote?: Maybe<{
      __typename?: "UserVote";
      userId: string;
      vote: VoteValue;
      id: string;
      postId: string;
    }>;
  }>;
};

export const AddCommentDocument = gql`
  mutation addComment($input: AddCommentInput!) {
    addComment(input: $input) {
      id
      post {
        id
        title
      }
      author {
        id
        username
        name
      }
      body
      createdAt
    }
  }
`;
export type AddCommentMutationFn = Apollo.MutationFunction<
  AddCommentMutation,
  AddCommentMutationVariables
>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCommentMutation,
    AddCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(
    AddCommentDocument,
    options
  );
}
export type AddCommentMutationHookResult = ReturnType<
  typeof useAddCommentMutation
>;
export type AddCommentMutationResult =
  Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<
  AddCommentMutation,
  AddCommentMutationVariables
>;
export const AddPostDocument = gql`
  mutation addPost($input: AddPostInput!) {
    addPost(input: $input) {
      id
      title
      slug
      content
      published
      archived
      author {
        id
        username
        name
      }
      category
      score
      numVotes
      numComments
      myVote {
        userId
        vote
        id
        postId
      }
      createdAt
      type
    }
  }
`;
export type AddPostMutationFn = Apollo.MutationFunction<
  AddPostMutation,
  AddPostMutationVariables
>;

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
export function useAddPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddPostMutation,
    AddPostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(
    AddPostDocument,
    options
  );
}
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<
  AddPostMutation,
  AddPostMutationVariables
>;
export const AddUserDocument = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      id
      username
      name
    }
  }
`;
export type AddUserMutationFn = Apollo.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>;

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
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserMutation,
    AddUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options
  );
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>;
export const SetPostArchivedDocument = gql`
  mutation setPostArchived($id: String!, $archived: Boolean!) {
    setPostArchived(id: $id, archived: $archived) {
      id
      title
      slug
      content
      published
      archived
      author {
        id
        username
        name
      }
      category
      score
      numVotes
      numComments
      myVote {
        userId
        vote
        id
        postId
      }
      createdAt
      type
    }
  }
`;
export type SetPostArchivedMutationFn = Apollo.MutationFunction<
  SetPostArchivedMutation,
  SetPostArchivedMutationVariables
>;

/**
 * __useSetPostArchivedMutation__
 *
 * To run a mutation, you first call `useSetPostArchivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPostArchivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPostArchivedMutation, { data, loading, error }] = useSetPostArchivedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      archived: // value for 'archived'
 *   },
 * });
 */
export function useSetPostArchivedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetPostArchivedMutation,
    SetPostArchivedMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetPostArchivedMutation,
    SetPostArchivedMutationVariables
  >(SetPostArchivedDocument, options);
}
export type SetPostArchivedMutationHookResult = ReturnType<
  typeof useSetPostArchivedMutation
>;
export type SetPostArchivedMutationResult =
  Apollo.MutationResult<SetPostArchivedMutation>;
export type SetPostArchivedMutationOptions = Apollo.BaseMutationOptions<
  SetPostArchivedMutation,
  SetPostArchivedMutationVariables
>;
export const VoteDocument = gql`
  mutation vote($authorId: String!, $postId: String!, $value: VoteValue!) {
    vote(authorId: $authorId, postId: $postId, value: $value) {
      id
      title
      slug
      content
      published
      archived
      author {
        id
        username
        name
      }
      category
      score
      numVotes
      numComments
      myVote {
        userId
        vote
        id
        postId
      }
      createdAt
      type
    }
  }
`;
export type VoteMutationFn = Apollo.MutationFunction<
  VoteMutation,
  VoteMutationVariables
>;

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
 *      postId: // value for 'postId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VoteMutation, VoteMutationVariables>(
    VoteDocument,
    options
  );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<
  VoteMutation,
  VoteMutationVariables
>;
export const CommentsDocument = gql`
  query comments($postId: String, $username: String, $cursor: CommentCursor) {
    comments(postId: $postId, username: $username, cursor: $cursor) {
      id
      post {
        id
        title
      }
      author {
        id
        username
        name
      }
      body
      createdAt
    }
  }
`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      username: // value for 'username'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCommentsQuery(
  baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    options
  );
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommentsQuery,
    CommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    options
  );
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<
  typeof useCommentsLazyQuery
>;
export type CommentsQueryResult = Apollo.QueryResult<
  CommentsQuery,
  CommentsQueryVariables
>;
export const GetPostByIdDocument = gql`
  query getPostById($id: String!) {
    getPostById(id: $id) {
      id
      title
      slug
      content
      published
      archived
      author {
        id
        username
        name
      }
      category
      score
      numVotes
      numComments
      myVote {
        userId
        vote
        id
        postId
      }
      createdAt
      type
    }
  }
`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(
    GetPostByIdDocument,
    options
  );
}
export function useGetPostByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(
    GetPostByIdDocument,
    options
  );
}
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<
  typeof useGetPostByIdLazyQuery
>;
export type GetPostByIdQueryResult = Apollo.QueryResult<
  GetPostByIdQuery,
  GetPostByIdQueryVariables
>;
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
export function useGetUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options
  );
}
export function useGetUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options
  );
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<
  typeof useGetUserByIdLazyQuery
>;
export type GetUserByIdQueryResult = Apollo.QueryResult<
  GetUserByIdQuery,
  GetUserByIdQueryVariables
>;
export const PostsDocument = gql`
  query posts(
    $category: String
    $sort: PostSort
    $username: String
    $archived: Boolean
    $order: SortOrder
    $year: Int
    $month: Int
    $week: Int
    $cursor: PostCursor
  ) {
    posts(
      category: $category
      sort: $sort
      username: $username
      archived: $archived
      order: $order
      year: $year
      month: $month
      week: $week
      cursor: $cursor
    ) {
      id
      title
      slug
      content
      published
      archived
      author {
        id
        username
        name
      }
      category
      score
      numVotes
      numComments
      myVote {
        userId
        vote
        id
        postId
      }
      createdAt
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
 *      username: // value for 'username'
 *      archived: // value for 'archived'
 *      order: // value for 'order'
 *      year: // value for 'year'
 *      month: // value for 'month'
 *      week: // value for 'week'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  );
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  );
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<
  PostsQuery,
  PostsQueryVariables
>;
