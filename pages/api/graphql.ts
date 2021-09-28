// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer } from "apollo-server-cloud-functions";
import { resolvers } from "../../backend/resolvers";
import typeDefs from "../../graphql/schema";
import { Request, Response } from 'express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { RequestContext } from '../../request.types';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log(err);
    return err;
  },
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: ({ req }: { req: Request; res: Response }): RequestContext => ({
    headers: req.headers,
    config: process.env,
  }),
});

const handler = server.createHandler();
export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
