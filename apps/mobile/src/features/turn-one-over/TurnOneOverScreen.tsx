import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { PrimaryButton } from "@/components/actions/PrimaryButton";
import { Screen } from "@/components/layout/Screen";
import { FlippableMemory } from "@/components/memory/FlippableMemory";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";

import { turnOneOverScreenStyles } from "./TurnOneOverScreen.styles";

export function TurnOneOverScreen() {
  const router = useRouter();
  const [hasTurnedMemoryOver, setHasTurnedMemoryOver] = useState(false);

  function handleMemoryFlip() {
    setHasTurnedMemoryOver(true);
  }

  function handleContinue() {
    router.push("/pick-your-hand");
  }

  return (
    <Screen>
      <View style={turnOneOverScreenStyles.content}>
        <OnboardingProgress currentStep={2} />

        <View style={turnOneOverScreenStyles.copy}>
          <Text style={turnOneOverScreenStyles.title}>Turn one over.</Text>
          <Text style={turnOneOverScreenStyles.message}>
            This is it. You write the history.
          </Text>
        </View>

        <View style={turnOneOverScreenStyles.memoryArea}>
          <FlippableMemory
            message="Nothing else in the world looked like that afternoon."
            onFirstFlip={handleMemoryFlip}
            style={turnOneOverScreenStyles.memoryCard}
          />
        </View>

        <PrimaryButton
          disabled={!hasTurnedMemoryOver}
          label={hasTurnedMemoryOver ? "Nice — keep going" : "Turn it over"}
          onPress={handleContinue}
        />
      </View>
    </Screen>
  );
}
