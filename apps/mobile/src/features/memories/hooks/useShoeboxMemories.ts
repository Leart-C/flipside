import { useQuery } from "@tanstack/react-query";

import { memoryQueryKeys } from "../memoryQueryKeys";
import { useMemoryRepository } from "./useMemoryRepository";

export function useShoeboxMemories() {
  const memoryRepository = useMemoryRepository();

  return useQuery({
    queryKey: memoryQueryKeys.shoebox(memoryRepository.ownerId),
    queryFn: memoryRepository.findAll,
  });
}
