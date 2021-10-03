import {
  MutationAddPostArgs,
  MutationAddUserArgs,
  Post,
  QueryGetUserByIdArgs,
  QueryPostsArgs,
  User,
  MutationVoteArgs,
  Comment,
  Resolvers,
  QueryGetPostBySlugArgs,
  MutationAddCommentArgs,
  QueryCommentsArgs, MutationSetPostArchivedArgs,
} from "../graphql/generated/types";
import { getPosts } from "./queries/getPosts";
import { RequestContext, UserAuth } from "../request.types";
import { addPost } from "./mutations/addPost";
import { addUser } from "./mutations/addUser";
import { vote } from "./mutations/vote";
import { addComment } from "./mutations/addComment";
import { getComments } from "./queries/comments";
import { dateScalar } from "../graphql/date.scalar";
import { setPostArchived } from "./mutations/setPostArchived";
import {getPostBySlug} from "./queries/getPostBySlug";
import db from "./db";

function wrapper<T, S>(fun: (args: T, token: UserAuth | null) => Promise<S>) {
  return (parent: unknown, args: T, { auth }: RequestContext) =>
    fun(args as T, auth);
}

function authWrapper<T, S = unknown>(
  fun: (args: T, token: UserAuth) => Promise<S>
) {
  return async (parent: unknown, args: T, { auth }: RequestContext) => {
    if (!auth) {
      throw new Error("Missing authentication");
    }
    if (!auth.id) {
      throw new Error(
        "You must create a user before accessing authenticated documents."
      );
    }
    return fun(args as T, auth);
  };
}

export const resolvers: Pick<Resolvers, "Query" | "Mutation" | "Date"> = {
  Date: dateScalar,
  Query: {
    posts: wrapper<QueryPostsArgs, Post[]>(getPosts),
    comments: wrapper<QueryCommentsArgs, Comment[]>(getComments),
    getUserById: wrapper<QueryGetUserByIdArgs, User | null>(db.getUserById),
    getPostBySlug: wrapper<QueryGetPostBySlugArgs, Post | null>(getPostBySlug),
  },
  Mutation: {
    addPost: authWrapper<MutationAddPostArgs, Post>(addPost),
    addUser: authWrapper<MutationAddUserArgs, User>(addUser),
    vote: authWrapper<MutationVoteArgs, Post>(vote),
    addComment: authWrapper<MutationAddCommentArgs, Comment>(addComment),
    setPostArchived: authWrapper<MutationSetPostArchivedArgs, Post>(
      setPostArchived
    ),
  },
};
