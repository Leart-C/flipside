export const memoryQueryKeys = {
  all: (ownerId: string) => ["memories", ownerId] as const,

  shoebox: (ownerId: string) =>
    [...memoryQueryKeys.all(ownerId), "shoebox"] as const,

  detail: (ownerId: string, memoryId: string) =>
    [...memoryQueryKeys.all(ownerId), "detail", memoryId] as const,

  ownership: (ownerId: string) => ["memory-ownership", ownerId] as const,
};
