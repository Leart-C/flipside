import { useQuery, useQueryClient } from "@tanstack/react-query";

import { memoryQueryKeys } from "../memoryQueryKeys";
import { useMemoryRepository } from "./useMemoryRepository";

export function useClaimLegacyMemories() {
  const memoryRepository = useMemoryRepository();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: memoryQueryKeys.ownership(memoryRepository.ownerId),

    queryFn: async () => {
      await memoryRepository.claimLegacyMemories();

      await queryClient.invalidateQueries({
        queryKey: memoryQueryKeys.all(memoryRepository.ownerId),
      });

      return true;
    },

    staleTime: Infinity,
    retry: 2,
  });
}
