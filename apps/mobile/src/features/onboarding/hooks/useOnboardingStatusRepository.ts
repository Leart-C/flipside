import { useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { createOnboardingStatusRepository } from "../data/OnboardingStatusRepository";

export function useOnboardingStatusRepository() {
  const database = useSQLiteContext();

  return useMemo(() => createOnboardingStatusRepository(database), [database]);
}
