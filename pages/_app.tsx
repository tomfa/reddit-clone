import "../styles/globals.css";
import type { AppProps } from "next/app";
import client from "../lib/gqlclient";
import { ApolloProvider } from "@apollo/client";
import { UserContext } from "../lib/context";
import {useUserData} from "../lib/hooks";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ApolloProvider client={client}>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserContext.Provider>
  );
}
export default MyApp;
