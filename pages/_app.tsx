import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Provider as NextAuthProvider } from "next-auth/client";
import type { AppProps } from "next/app";
import { config } from "../lib/config";
import { PageWrapper } from "../components/PageWrapper";
import Header from "../components/Header/Component";
import { withScalars } from "apollo-link-scalars";
import { schema } from "../graphql/schema";
import { parseValue, serialize } from "../graphql/date.scalar";
import {
  Post,
  QueryCommentsArgs,
  QueryPostsArgs,
} from "../graphql/generated/types";

const typesMap = {
  Date: {
    serialize,
    parseValue,
  },
};

const link = ApolloLink.from([
  withScalars({ schema, typesMap }),
  new HttpLink({ uri: config.graphqlAPIUrl }),
]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [
            "category",
            "userName",
            "sort",
            "order",
            "createdAfter",
          ] as Array<keyof QueryPostsArgs>,
          merge(existing: Post[] = [], incoming: Post[]) {
            return [...existing, ...incoming];
          },
        },
        comments: {
          keyArgs: ["postId", "authorId"] as Array<keyof QueryCommentsArgs>,
          merge(existing: Post[] = [], incoming: Post[]) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const App = (props: AppProps) => {
  const client = new ApolloClient({
    link,
    cache,
  });

  return (
    <NextAuthProvider session={props.pageProps.session}>
      <ApolloProvider client={client}>
        <Header />
        <PageWrapper>
          <props.Component {...props.pageProps} />
        </PageWrapper>

        <Toaster />
      </ApolloProvider>
    </NextAuthProvider>
  );
};

export default App;
