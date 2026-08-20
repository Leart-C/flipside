import { View } from "react-native";

import { onboardingProgressStyles } from "./OnboardingProgress.styles";

type OnboardingStep = 1 | 2 | 3;

type OnboardingProgressProps = {
  currentStep: OnboardingStep;
};

const onboardingSteps = [1, 2, 3] as const;

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  return (
    <View
      accessible
      accessibilityLabel="Onboarding progress"
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 1,
        max: onboardingSteps.length,
        now: currentStep,
      }}
      style={onboardingProgressStyles.container}
    >
      {onboardingSteps.map((step) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <View
            key={step}
            style={[
              onboardingProgressStyles.step,
              isCompleted && onboardingProgressStyles.completedStep,
              isCurrent && onboardingProgressStyles.currentStep,
            ]}
          ></View>
        );
      })}
    </View>
  );
}
