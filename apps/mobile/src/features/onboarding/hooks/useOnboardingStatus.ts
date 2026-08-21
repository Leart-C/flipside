import { useQuery } from "@tanstack/react-query";

import { onboardingQueryKeys } from "../onboardingQueryKeys";
import { useOnboardingStatusRepository } from "./useOnboardingStatusRepository";

export function useOnboardingStatus() {
  const onboardingStatusRepository = useOnboardingStatusRepository();

  return useQuery({
    queryKey: onboardingQueryKeys.status,
    queryFn: onboardingStatusRepository.hasCompletedOnboarding,
    staleTime: Infinity,
  });
}
