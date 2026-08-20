import { useState } from "react";

import type { HandwritingId } from "@/domain/handwriting";
import type {
  InkColorId,
  MemoryDraft,
  MemoryTextSizeId,
} from "@/domain/memory";

const CURRENT_PRINT_LAYOUT_VERSION = 1;

function createMemoryDraft(
  photoId: string,
  handwriting: HandwritingId,
): MemoryDraft {
  return {
    photoId,
    message: "",
    handwriting,
    inkColor: "black",
    textSize: "medium",
    printLayoutVersion: CURRENT_PRINT_LAYOUT_VERSION,
  };
}

export function useMemoryDraft(
  photoId: string,
  initialHandwriting: HandwritingId,
) {
  const [storedDraft, setStoredDraft] = useState<MemoryDraft>(() =>
    createMemoryDraft(photoId, initialHandwriting),
  );

  const draft =
    storedDraft.photoId === photoId
      ? storedDraft
      : createMemoryDraft(photoId, initialHandwriting);

  function updateMessage(message: string) {
    setStoredDraft((currentDraft) => {
      const activeDraft =
        currentDraft.photoId === photoId
          ? currentDraft
          : createMemoryDraft(photoId, initialHandwriting);

      return {
        ...activeDraft,
        message,
      };
    });
  }

  function chooseInkColor(inkColor: InkColorId) {
    setStoredDraft((currentDraft) => {
      const activeDraft =
        currentDraft.photoId === photoId
          ? currentDraft
          : createMemoryDraft(photoId, initialHandwriting);

      return {
        ...activeDraft,
        inkColor,
      };
    });
  }

  function chooseTextSize(textSize: MemoryTextSizeId) {
    setStoredDraft((currentDraft) => {
      const activeDraft =
        currentDraft.photoId === photoId
          ? currentDraft
          : createMemoryDraft(photoId, initialHandwriting);

      return {
        ...activeDraft,
        textSize,
      };
    });
  }

  return {
    chooseInkColor,
    chooseTextSize,
    draft,
    updateMessage,
  };
}
