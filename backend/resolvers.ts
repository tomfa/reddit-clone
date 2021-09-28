import { MutationAddPostArgs } from "../graphql/generated/types";
import { IncomingHttpHeaders } from "http";
import { getPosts } from "./queries/getPosts";
import { EmptyResolverArgs } from "../request.types";
import { addPost } from "./mutations/addPost";

type RequestContext = {
  headers: IncomingHttpHeaders;
  config: NodeJS.ProcessEnv;
};

function resolverWrapper<T>(
  fun: (args: T, token: undefined) => Promise<unknown>
) {
  return async (parent: unknown, args: T, { headers }: RequestContext) => {
    const authHeader = headers.authorization || headers["x-authorization"];
    const token = undefined; //await getVerifiedTokenData(authHeader && String(authHeader));
    return fun(args as T, token);
  };
}

export const resolvers = {
  Query: {
    posts: resolverWrapper<EmptyResolverArgs>(getPosts),
  },
  Mutation: {
    addPost: resolverWrapper<MutationAddPostArgs>(addPost),
  },
};
