import { ClerkProvider, useAuth } from "@clerk/expo";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useOnboardingStatus } from "@/features/onboarding/hooks/useOnboardingStatus";
import { databaseConfig } from "@/database/databaseConfig";
import { migrateDatabase } from "@/database/migrateDatabase";
import { clerkConfig } from "@/features/auth/clerkConfig";
import { clerkTokenCache } from "@/features/auth/clerkTokenCache";
import { AuthenticationLoadingScreen } from "@/features/auth/components/AuthenticationLoadingScreen";
import { OnboardingPreferencesProvider } from "@/features/onboarding/OnboardingPreferencesProvider";
import { queryClient } from "@/query/queryClient";
import { fontAssets } from "@/theme/fonts";

void SplashScreen.preventAutoHideAsync();

function AppNavigator() {
  const { isLoaded: authenticationLoaded, isSignedIn } = useAuth();

  const {
    data: hasCompletedOnboarding = false,
    isPending: onboardingStatusLoading,
  } = useOnboardingStatus();

  const signedOut = authenticationLoaded && !isSignedIn;

  if (!authenticationLoaded || (signedOut && onboardingStatusLoading)) {
    return <AuthenticationLoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={signedOut && !hasCompletedOnboarding}>
        <Stack.Screen name="index" />
        <Stack.Screen name="turn-one-over" />
        <Stack.Screen name="pick-your-hand" />
      </Stack.Protected>

      <Stack.Protected guard={signedOut && hasCompletedOnboarding}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>

      <Stack.Protected guard={Boolean(isSignedIn)}>
        <Stack.Screen name="(authenticated)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  const fontsReady = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (fontsReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  if (!fontsReady) {
    return null;
  }

  return (
    <ClerkProvider
      __experimental_disableNativeClientSync
      publishableKey={clerkConfig.publishableKey}
      tokenCache={clerkTokenCache}
    >
      <SQLiteProvider
        databaseName={databaseConfig.name}
        onInit={migrateDatabase}
      >
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <OnboardingPreferencesProvider>
              <AppNavigator />
            </OnboardingPreferencesProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </SQLiteProvider>
    </ClerkProvider>
  );
}
