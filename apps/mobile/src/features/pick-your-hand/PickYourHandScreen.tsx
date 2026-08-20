import { Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";

import { pickYourHandScreenStyles } from "./PickYourHandScreen.styles";

export function PickYourHandScreen() {
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
      </View>
    </Screen>
  );
}
