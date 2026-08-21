import { useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { createMemoryRepository } from "../data/MemoryRepository";

export function useMemoryRepository() {
  const database = useSQLiteContext();

  return useMemo(() => createMemoryRepository(database), [database]);
}
