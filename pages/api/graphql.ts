// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer } from "apollo-server-cloud-functions";
import { resolvers } from "../../backend/resolvers";
import typeDefs from "../../graphql/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { RequestContext } from "../../request.types";
import { NextApiRequest, NextApiResponse } from "next";
import { toUserAuth } from "../../request.utils";
import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log(err);
    return err;
  },
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        "editor.theme": "light",
        "request.credentials": "include",
      },
    }),
  ],
  context: async ({
    req,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }): Promise<RequestContext> => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    console.log("token", token);
    const auth = toUserAuth(token);
    return {
      headers: req.headers,
      config: process.env,
      auth,
    };
  },
});

const handler = server.createHandler();
export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
