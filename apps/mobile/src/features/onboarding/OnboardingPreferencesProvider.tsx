import { createContext, type ReactNode, useContext, useState } from "react";

import type { HandwritingId } from "@/domain/handwriting";

type OnboardingPreferences = {
  selectedHandwriting: HandwritingId;
  chooseHandwriting: (handwritingId: HandwritingId) => void;
};

type OnboardingPreferencesProviderProps = {
  children: ReactNode;
};

const OnboardingPreferencesContext =
  createContext<OnboardingPreferences | null>(null);

export function OnboardingPreferencesProvider({
  children,
}: OnboardingPreferencesProviderProps) {
  const [selectedHandwriting, setSelectedHandwriting] =
    useState<HandwritingId>("note");

  function chooseHandwriting(handwritingId: HandwritingId) {
    setSelectedHandwriting(handwritingId);
  }

  return (
    <OnboardingPreferencesContext
      value={{
        selectedHandwriting,
        chooseHandwriting,
      }}
    >
      {children}
    </OnboardingPreferencesContext>
  );
}

export function useOnboardingPreferences() {
  const preferences = useContext(OnboardingPreferencesContext);

  if (!preferences) {
    throw new Error(
      "useOnboardingPreferences must be used inside OnboardingPreferencesProvider",
    );
  }

  return preferences;
}
