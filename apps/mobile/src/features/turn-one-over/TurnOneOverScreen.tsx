import { Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";

import { turnOneOverScreenStyles } from "./TurnOneOverScreen.styles";

export function TurnOneOverScreen() {
  return (
    <Screen>
      <View style={turnOneOverScreenStyles.content}>
        <OnboardingProgress currentStep={2} />

        <View style={turnOneOverScreenStyles.copy}>
          <Text style={turnOneOverScreenStyles.title}>Turn one over.</Text>
          <Text style={turnOneOverScreenStyles.message}>
            That is the whole app. Everything else just gets out of your way.
          </Text>
        </View>
      </View>
    </Screen>
  );
}