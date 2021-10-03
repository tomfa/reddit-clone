import { useMemo } from "react";
import { useSession } from "next-auth/client";
import {useRouter} from "next/router";

export function useUserData() {
  const [session, isLoading] = useSession();
  const username = useMemo(() => session?.user?.username, [session]);
  return { user: session?.user, username, isLoggedIn: !!session?.user, isLoading };
}


export function getCurrentCategory() {
  const router = useRouter();
  const category = useMemo(() => {
    const defaultCategory = 'all';
    const val = router.query['category'];
    if (!val) {
      return defaultCategory
    }
    if (typeof val === 'string') {
      return val
    }
    return val[0];
  }, [router.query])
  return category
}
