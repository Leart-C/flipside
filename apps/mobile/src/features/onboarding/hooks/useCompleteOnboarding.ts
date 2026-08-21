import { useMutation, useQueryClient } from "@tanstack/react-query";

import { onboardingQueryKeys } from "../onboardingQueryKeys";
import { useOnboardingStatusRepository } from "./useOnboardingStatusRepository";

export function useCompleteOnboarding() {
  const onboardingStatusRepository = useOnboardingStatusRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onboardingStatusRepository.markOnboardingCompleted,

    onSuccess: () => {
      queryClient.setQueryData(onboardingQueryKeys.status, true);
    },
  });
}
