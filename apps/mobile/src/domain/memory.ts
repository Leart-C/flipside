import type { HandwritingId } from "./handwriting";

export type InkColorId = "black" | "blue" | "red" | "green";

export type MemoryTextSizeId = "small" | "medium" | "large";

export type MemorySyncStatus = "local" | "pending" | "synced" | "failed";

export type SavedMemory = MemoryDraft & {
  id: string;
  syncStatus: MemorySyncStatus;
  createdAt: number;
  updatedAt: number;
};

export type MemoryDraft = {
  photoId: string;
  message: string;
  handwriting: HandwritingId;
  inkColor: InkColorId;
  textSize: MemoryTextSizeId;
  printLayoutVersion: number;
};
