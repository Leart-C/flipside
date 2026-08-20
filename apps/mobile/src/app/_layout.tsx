import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { databaseConfig } from "@/database/databaseConfig";
import { migrateDatabase } from "@/database/migrateDatabase";
import { OnboardingPreferencesProvider } from "@/features/onboarding/OnboardingPreferencesProvider";
import { fontAssets } from "@/theme/fonts";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SQLiteProvider databaseName={databaseConfig.name} onInit={migrateDatabase}>
      <SafeAreaProvider>
        <OnboardingPreferencesProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </OnboardingPreferencesProvider>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
