import { useQuery } from "@tanstack/react-query";

import { memoryQueryKeys } from "../memoryQueryKeys";
import { useMemoryRepository } from "./useMemoryRepository";

export function useSavedMemory(memoryId: string) {
  const memoryRepository = useMemoryRepository();

  return useQuery({
    enabled: memoryId.length > 0,
    queryKey: memoryQueryKeys.detail(memoryId),
    queryFn: () => memoryRepository.findById(memoryId),
  });
}
