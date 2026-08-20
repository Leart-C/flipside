import { Text, View } from "react-native";

import { HandwritingOption } from "@/components/handwriting/HandwritingOption";
import { Screen } from "@/components/layout/Screen";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import type { HandwritingId } from "@/domain/handwriting";
import { useOnboardingPreferences } from "@/features/onboarding/OnboardingPreferencesProvider";

import { handwritingOptions } from "./handwritingOptions";
import { pickYourHandScreenStyles } from "./PickYourHandScreen.styles";

export function PickYourHandScreen() {
  const { selectedHandwriting, chooseHandwriting } = useOnboardingPreferences();

  function handleHandwritingSelect(handwritingId: HandwritingId) {
    chooseHandwriting(handwritingId);
  }

  return (
    <Screen>
      <View style={pickYourHandScreenStyles.content}>
        <OnboardingProgress currentStep={3} />

        <View style={pickYourHandScreenStyles.copy}>
          <Text style={pickYourHandScreenStyles.title}>Pick your hand.</Text>
          <Text style={pickYourHandScreenStyles.message}>
            Whatever you choose becomes your default. You can change it on any
            photo, any time.
          </Text>
        </View>

        <View
          accessibilityRole="radiogroup"
          style={pickYourHandScreenStyles.options}
        >
          {handwritingOptions.map((option) => (
            <HandwritingOption
              key={option.id}
              onSelect={handleHandwritingSelect}
              option={option}
              selected={selectedHandwriting === option.id}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}
