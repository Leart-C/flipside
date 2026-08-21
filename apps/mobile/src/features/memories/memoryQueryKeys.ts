export const memoryQueryKeys = {
  all: ["memories"] as const,
  shoebox: ["memories", "shoebox"] as const,
  detail: (memoryId: string) => ["memories", "detail", memoryId] as const,
};
