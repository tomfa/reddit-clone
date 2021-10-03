import { useMemo } from "react";
import { useSession } from "next-auth/client";

export function useUserData() {
  const [session, isLoading] = useSession();
  const username = useMemo(() => session?.user?.email, [session]);

  return { user: session?.user, username, isLoggedIn: !!session?.user, isLoading };
}
