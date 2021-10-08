import { useEffect } from "react";
import { useRouter } from "next/router";
import auth from "next-auth/client";
import { Loader } from "../components/Loader";
import { ROUTES } from "../utils/routes.utils";

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

  return <Loader show={true} />;
}
