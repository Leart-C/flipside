import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { PrimaryButton } from "@/components/actions/PrimaryButton";
import { HandwritingOption } from "@/components/handwriting/HandwritingOption";
import { handwritingOptions } from "@/components/handwriting/handwritingOptions";
import { Screen } from "@/components/layout/Screen";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import type { HandwritingId } from "@/domain/handwriting";
import { useCompleteOnboarding } from "@/features/onboarding/hooks/useCompleteOnboarding";
import { useOnboardingPreferences } from "@/features/onboarding/OnboardingPreferencesProvider";

import { pickYourHandScreenStyles } from "./PickYourHandScreen.styles";

export function PickYourHandScreen() {
  const router = useRouter();
  const { selectedHandwriting, chooseHandwriting } = useOnboardingPreferences();

  const {
    isError: completionFailed,
    isPending: isCompletingOnboarding,
    mutateAsync: completeOnboarding,
  } = useCompleteOnboarding();

  function handleHandwritingSelect(handwritingId: HandwritingId) {
    chooseHandwriting(handwritingId);
  }

  async function handleStartWriting() {
    try {
      await completeOnboarding();

      router.dismissAll();
      router.replace("/sign-in");
    } catch (error) {
      console.error("Onboarding completion failed:", error);
    }
  }

  return (
    <Screen>
      <View style={pickYourHandScreenStyles.content}>
        <OnboardingProgress currentStep={3} />

        <View style={pickYourHandScreenStyles.copy}>
          <Text style={pickYourHandScreenStyles.title}>Pick your hand</Text>

          <Text style={pickYourHandScreenStyles.message}>
            Whatever you choose becomes your default. You can change it on any
            photo, any time
          </Text>
        </View>

        <ScrollView
          accessibilityRole="radiogroup"
          contentContainerStyle={pickYourHandScreenStyles.optionsContent}
          showsVerticalScrollIndicator={false}
          style={pickYourHandScreenStyles.optionsList}
        >
          {handwritingOptions.map((option) => (
            <HandwritingOption
              key={option.id}
              onSelect={handleHandwritingSelect}
              option={option}
              selected={selectedHandwriting === option.id}
            />
          ))}
        </ScrollView>

        {completionFailed && (
          <Text
            accessibilityLiveRegion="polite"
            style={pickYourHandScreenStyles.errorMessage}
          >
            Your choice couldn&apos;t be saved. Please try again.
          </Text>
        )}

        <PrimaryButton
          disabled={isCompletingOnboarding}
          label={
            isCompletingOnboarding ? "Saving your choice..." : "Start writing"
          }
          onPress={() => {
            void handleStartWriting();
          }}
        />
      </View>
    </Screen>
  );
}
