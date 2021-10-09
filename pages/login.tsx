import { useEffect } from "react";
import { useRouter } from "next/router";
import auth from "next-auth/client";
import { ROUTES } from "../utils/routes.utils";
import LoadingIndicatorBox from "../components/shared/LoadingIndicator/Box";

export default function LoginPage() {
  const [session, loading] = auth.useSession();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!session) {
      auth.signIn("google");
    } else {
      router.push(ROUTES.HOME());
    }
  }, [router, session, loading]);

  return <LoadingIndicatorBox />;
}
