import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Navbar from "../components/Navbar";
import { Provider as NextAuthProvider } from "next-auth/client";
import type { AppProps } from "next/app";
import { config } from "../lib/config";
import { PageWrapper } from "../components/PageWrapper";
import CategoryMenu from "../components/CategoryMenu/Component";

const App = (props: AppProps) => {
  const client = new ApolloClient({
    uri: config.graphqlAPIUrl,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  return (
    <NextAuthProvider session={props.pageProps.session}>
      <ApolloProvider client={client}>
        <Navbar />
        <PageWrapper>
          <props.Component {...props.pageProps} />
        </PageWrapper>

        <Toaster />
      </ApolloProvider>
    </NextAuthProvider>
  );
};

export default App;
