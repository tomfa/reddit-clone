import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider as NextAuthProvider } from "next-auth/client";
import type { AppProps } from "next/app";
import { config } from "../lib/config";
import { PageWrapper } from "../components/PageWrapper";
import Header from "../components/Header/Component";

const App = (props: AppProps) => {
  const client = new ApolloClient({
    uri: config.graphqlAPIUrl,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === "development",
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
