import { useState } from "react";

import type { HandwritingId } from "@/domain/handwriting";
import type {
  InkColorId,
  MemoryDraft,
  MemoryTextSizeId,
} from "@/domain/memory";

const CURRENT_PRINT_LAYOUT_VERSION = 1;

export function createNewMemoryDraft(
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

function copyMemoryDraft(draft: MemoryDraft): MemoryDraft {
  return {
    photoId: draft.photoId,
    message: draft.message,
    handwriting: draft.handwriting,
    inkColor: draft.inkColor,
    textSize: draft.textSize,
    printLayoutVersion: draft.printLayoutVersion,
  };
}

export function useMemoryDraft(initialDraft: MemoryDraft) {
  const [storedDraft, setStoredDraft] = useState<MemoryDraft>(() =>
    copyMemoryDraft(initialDraft),
  );

  const draft =
    storedDraft.photoId === initialDraft.photoId
      ? storedDraft
      : copyMemoryDraft(initialDraft);

  function getActiveDraft(currentDraft: MemoryDraft) {
    return currentDraft.photoId === initialDraft.photoId
      ? currentDraft
      : copyMemoryDraft(initialDraft);
  }

  function updateMessage(message: string) {
    setStoredDraft((currentDraft) => ({
      ...getActiveDraft(currentDraft),
      message,
    }));
  }

  function chooseInkColor(inkColor: InkColorId) {
    setStoredDraft((currentDraft) => ({
      ...getActiveDraft(currentDraft),
      inkColor,
    }));
  }

  function chooseTextSize(textSize: MemoryTextSizeId) {
    setStoredDraft((currentDraft) => ({
      ...getActiveDraft(currentDraft),
      textSize,
    }));
  }

  function chooseHandwriting(handwriting: HandwritingId) {
    setStoredDraft((currentDraft) => ({
      ...getActiveDraft(currentDraft),
      handwriting,
    }));
  }

  return {
    chooseHandwriting,
    chooseInkColor,
    chooseTextSize,
    draft,
    updateMessage,
  };
}
