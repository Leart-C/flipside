import { useAuth } from "@clerk/expo";
import { useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { createMemoryRepository } from "../data/MemoryRepository";

export function useMemoryRepository() {
  const { userId } = useAuth();
  const database = useSQLiteContext();

  const memoryRepository = useMemo(() => {
    if (!userId) {
      return null;
    }

    return createMemoryRepository(database, userId);
  }, [database, userId]);

  if (!memoryRepository) {
    throw new Error(
      "The memory repository cannot be used without an authenticated user.",
    );
  }

  return memoryRepository;
}
