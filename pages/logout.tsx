import { useEffect } from "react";
import { useRouter } from "next/router";
import auth from "next-auth/client";
import { ROUTES } from "../utils/routes.utils";
import { useApolloClient } from "@apollo/client";

export default function LogoutPage() {
  const [session, isLoading] = auth.useSession();
  const client = useApolloClient();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    client.clearStore();
    if (session) {
      auth.signOut();
    }
    if (!session) {
      router.push(ROUTES.HOME());
    }
  }, [router, session, isLoading, client]);

  return <h1 style={{ paddingTop: "3rem" }}>Logging out...</h1>;
}
