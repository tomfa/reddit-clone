// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer } from "apollo-server-cloud-functions";
import { resolvers } from "../../backend/resolvers";
import typeDefs from "../../graphql/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";


const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log(err);
    return err;
  },
  introspection: true,
  context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res,
  }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const handler = server.createHandler();
export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
