import {
  MutationAddPostArgs,
  MutationAddUserArgs,
  Post,
  QueryGetUserByIdArgs,
  QueryPostsArgs,
  User,
  MutationVoteArgs,
  Resolvers,
} from "../graphql/generated/types";
import { getPosts } from "./queries/getPosts";
import { RequestContext, UserAuth } from "../request.types";
import { addPost } from "./mutations/addPost";
import { addUser } from "./mutations/addUser";
import { getUserById } from "./db";
import { vote } from "./mutations/vote";

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

export const resolvers: Pick<Resolvers, 'Query' | 'Mutation'> = {
  Query: {
    posts: wrapper<QueryPostsArgs, Post[]>(getPosts),
    getUserById: wrapper<QueryGetUserByIdArgs, User | null>(getUserById),
  },
  Mutation: {
    addPost: authWrapper<MutationAddPostArgs, Post>(addPost),
    addUser: authWrapper<MutationAddUserArgs, User>(addUser),
    vote: authWrapper<MutationVoteArgs, Post>(vote),
  },
};
