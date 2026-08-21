import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";

import { GoogleSignInButton } from "./components/GoogleSignInButton";
import { useGoogleAuthentication } from "./hooks/useGoogleAuthentication";
import { authenticationScreenStyles } from "./AuthenticationScreen.styles";

export function AuthenticationScreen() {
  const { isSignedIn } = useAuth();

  const { isReady, isSigningIn, signInFailed, signInWithGoogle } =
    useGoogleAuthentication();

  if (isReady && isSignedIn) {
    return <Redirect href="/photos" />;
  }

  return (
    <Screen>
      <View style={authenticationScreenStyles.content}>
        <View style={authenticationScreenStyles.introduction}>
          <View
            accessible
            accessibilityLabel="A photo with writing on its reverse"
            style={authenticationScreenStyles.memoryPreview}
          >
            <View style={authenticationScreenStyles.photoSide}>
              <View style={authenticationScreenStyles.photoShape} />
            </View>

            <View style={authenticationScreenStyles.writingSide}>
              <View style={authenticationScreenStyles.writingLine} />
              <View style={authenticationScreenStyles.shortWritingLine} />
            </View>
          </View>

          <Text style={authenticationScreenStyles.title}>Keep every side.</Text>

          <Text style={authenticationScreenStyles.message}>
            Sign in to keep your written memories together and ready whenever
            you want to print them.
          </Text>
        </View>

        <View style={authenticationScreenStyles.actions}>
          {signInFailed && (
            <Text
              accessibilityLiveRegion="polite"
              style={authenticationScreenStyles.errorMessage}
            >
              Google sign-in couldn&apos;t be completed. Please try again.
            </Text>
          )}

          <GoogleSignInButton
            disabled={!isReady}
            isLoading={isSigningIn}
            onPress={() => {
              void signInWithGoogle();
            }}
          />

          <Text style={authenticationScreenStyles.legalMessage}>
            By continuing, you agree to Flipside&apos;s Terms and Privacy
            Policy.
          </Text>
        </View>
      </View>
    </Screen>
  );
}
