import {
  MutationAddPostArgs,
  MutationAddUserArgs, QueryPostsArgs,
} from "../graphql/generated/types";
import { getPosts } from "./queries/getPosts";
import { EmptyResolverArgs, RequestContext, UserAuth } from "../request.types";
import { addPost } from "./mutations/addPost";
import { addUser } from "./mutations/addUser";
import { getUserById } from "./db";

function wrapper<T>(
  fun: (args: T, token: UserAuth | null) => Promise<unknown>
) {
  return async (parent: unknown, args: T, { auth }: RequestContext) => {
    return fun(args as T, auth);
  };
}

function authWrapper<T>(fun: (args: T, token: UserAuth) => Promise<unknown>) {
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

export const resolvers = {
  Query: {
    posts: wrapper<QueryPostsArgs>(getPosts),
    getUserById: wrapper<string>(getUserById),
  },
  Mutation: {
    addPost: authWrapper<MutationAddPostArgs>(addPost),
    addUser: authWrapper<MutationAddUserArgs>(addUser),
  },
};
