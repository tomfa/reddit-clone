import { MutationAddPostArgs } from "../graphql/generated/types";
import { getPosts } from "./queries/getPosts";
import {EmptyResolverArgs, RequestContext, UserAuth} from "../request.types";
import { addPost } from "./mutations/addPost";

function wrapper<T>(
  fun: (args: T, token: UserAuth) => Promise<unknown>
) {
  return async (parent: unknown, args: T, { auth }: RequestContext) => {
    return fun(args as T, auth);
  };
}

function authWrapper<T>(
  fun: (args: T, token: UserAuth) => Promise<unknown>
) {
  return async (parent: unknown, args: T, { auth }: RequestContext) => {
    if (!auth) {
      throw new Error('Missing authentication')
    }
    return fun(args as T, auth);
  };
}

export const resolvers = {
  Query: {
    posts: wrapper<EmptyResolverArgs>(getPosts),
  },
  Mutation: {
    addPost: authWrapper<MutationAddPostArgs>(addPost),
  },
};
