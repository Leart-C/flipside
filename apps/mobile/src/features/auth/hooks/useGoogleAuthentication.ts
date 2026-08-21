import { useAuth, useSSO } from "@clerk/expo";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";

export function useGoogleAuthentication() {
  const { isLoaded } = useAuth();
  const { startSSOFlow } = useSSO();

  const authenticationInProgress = useRef(false);

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInFailed, setSignInFailed] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    void WebBrowser.warmUpAsync();

    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  async function signInWithGoogle() {
    if (!isLoaded || authenticationInProgress.current) {
      return false;
    }

    authenticationInProgress.current = true;
    setIsSigningIn(true);
    setSignInFailed(false);

    try {
      const { authSessionResult, createdSessionId, setActive } =
        await startSSOFlow({
          strategy: "oauth_google",
        });

      const authenticationWasCancelled =
        authSessionResult?.type === "cancel" ||
        authSessionResult?.type === "dismiss";

      if (authenticationWasCancelled) {
        return false;
      }

      if (!createdSessionId || !setActive) {
        setSignInFailed(true);
        return false;
      }

      await setActive({
        session: createdSessionId,
      });

      return true;
    } catch (error){
      console.error("Google sign-in failed:", error);
      setSignInFailed(true);
      return false;
    } finally {
      authenticationInProgress.current = false;
      setIsSigningIn(false);
    }
  }

  return {
    isReady: isLoaded,
    isSigningIn,
    signInFailed,
    signInWithGoogle,
  };
}
