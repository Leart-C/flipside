import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { PrimaryButton } from "@/components/actions/PrimaryButton";
import { HandwritingOption } from "@/components/handwriting/HandwritingOption";
import { Screen } from "@/components/layout/Screen";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import type { HandwritingId } from "@/domain/handwriting";
import { useOnboardingPreferences } from "@/features/onboarding/OnboardingPreferencesProvider";

import { handwritingOptions } from "@/components/handwriting/handwritingOptions";
import { pickYourHandScreenStyles } from "./PickYourHandScreen.styles";

export function PickYourHandScreen() {
  const router = useRouter();
  const { selectedHandwriting, chooseHandwriting } = useOnboardingPreferences();

  function handleHandwritingSelect(handwritingId: HandwritingId) {
    chooseHandwriting(handwritingId);
  }

  function handleStartWriting() {
    router.dismissAll();
    router.replace("/sign-in");
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

        <PrimaryButton label="Start writing" onPress={handleStartWriting} />
      </View>
    </Screen>
  );
}
