import { useEffect } from "react";
import { useRouter } from "next/router";
import auth from "next-auth/client";
import {ROUTES} from "../utils/routes.utils";

export default function LogoutPage() {
  const [session, isLoading] = auth.useSession();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (session) {
      auth.signOut();
    }
    if (!session) {
      router.push(ROUTES.HOME());
    }
  }, [router, session, isLoading]);

  return <h1 style={{ paddingTop: "3rem" }}>Logging out...</h1>;
}
