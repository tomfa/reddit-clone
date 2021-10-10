import { useMemo } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

export function useUserData() {
  const [session, isLoading] = useSession();
  const username = useMemo(() => session?.user?.username, [session]);
  return {
    user: session?.user,
    username,
    isLoggedIn: !!session?.user,
    isLoading,
  };
}

export const useUrlQueryString = (key: string, defaultValue?: string) => {
  const router = useRouter();
  return useMemo(() => {
    const val = router.query[key];
    if (!val) {
      return defaultValue;
    }
    if (typeof val === "string") {
      return val;
    }
    return val[0];
  }, [router.query, key, defaultValue]);
};

export function useCurrentCategory() {
  return useUrlQueryString("category");
}
