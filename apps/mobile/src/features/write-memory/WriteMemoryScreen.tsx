import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/layout/Screen";
import { useOnboardingPreferences } from "@/features/onboarding/OnboardingPreferencesProvider";
import { colors } from "@/theme/colors";
import { fontFamilies } from "@/theme/fonts";

import { MemoryWritingCard } from "./components/MemoryWritingCard";
import { useSelectedPhoto } from "./hooks/useSelectedPhoto";
import { writeMemoryScreenStyles } from "./WriteMemoryScreen.styles";

type WriteMemoryScreenProps = {
  photoId: string;
};

export function WriteMemoryScreen({ photoId }: WriteMemoryScreenProps) {
  const router = useRouter();
  const { selectedHandwriting } = useOnboardingPreferences();
  const { error, isLoading } = useSelectedPhoto(photoId);

  const [message, setMessage] = useState("");

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={writeMemoryScreenStyles.content}
      >
        <Pressable
          accessibilityLabel="Return to photo library"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={writeMemoryScreenStyles.backButton}
        >
          <Text style={writeMemoryScreenStyles.backLabel}>Photos</Text>
        </Pressable>

        <Text style={writeMemoryScreenStyles.title}>The blank back</Text>

        {isLoading && <ActivityIndicator color={colors.action} />}

        {error && (
          <Text style={writeMemoryScreenStyles.errorMessage}>
            This photo could not be opened.
          </Text>
        )}

        {!isLoading && !error && (
          <MemoryWritingCard
            fontFamily={fontFamilies[selectedHandwriting]}
            message={message}
            onMessageChange={setMessage}
          />
        )}

        <View style={writeMemoryScreenStyles.keyboardSpace} />
      </KeyboardAvoidingView>
    </Screen>
  );
}
