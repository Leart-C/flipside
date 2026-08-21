import { useAuth, useClerk } from "@clerk/expo";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

import { memoryQueryKeys } from "@/features/memories/memoryQueryKeys";

export function useSignOut() {
  const { userId } = useAuth();
  const { signOut } = useClerk();
  const queryClient = useQueryClient();
  const router = useRouter();

  const signOutInProgress = useRef(false);

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutFailed, setSignOutFailed] = useState(false);

  async function signOutCurrentUser() {
    if (!userId || signOutInProgress.current) {
      return false;
    }

    signOutInProgress.current = true;
    setIsSigningOut(true);
    setSignOutFailed(false);

    const memoryQueryKey = memoryQueryKeys.all(userId);
    const ownershipQueryKey = memoryQueryKeys.ownership(userId);

    try {
      await signOut();

      await Promise.all([
        queryClient.cancelQueries({
          queryKey: memoryQueryKey,
        }),
        queryClient.cancelQueries({
          queryKey: ownershipQueryKey,
        }),
      ]);

      queryClient.removeQueries({
        queryKey: memoryQueryKey,
      });

      queryClient.removeQueries({
        queryKey: ownershipQueryKey,
      });

      router.replace("/sign-in");

      return true;
    } catch (error) {
      console.error("Sign out failed:", error);
      setSignOutFailed(true);
      setIsSigningOut(false);
      signOutInProgress.current = false;

      return false;
    }
  }

  return {
    isSigningOut,
    signOutFailed,
    signOutCurrentUser,
  };
}
