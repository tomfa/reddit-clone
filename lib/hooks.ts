import { useMemo } from "react";
import { useSession } from "next-auth/client";

export function useUserData() {
  const [session] = useSession();
  const username = useMemo(() => session?.user?.email, [session]);

  // TODO: Gotta create user if it doesnt exist
  return { user: session?.user, username, isLoggedIn: !!session?.user };
}
