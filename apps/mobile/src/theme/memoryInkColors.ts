import type { InkColorId } from "@/domain/memory";

import { colors } from "./colors";

const memoryInkColors: Record<InkColorId, string> = {
  black: colors.blackInk,
  blue: colors.blueInk,
  red: colors.redInk,
  green: colors.greenInk,
};

export function getMemoryInkColor(inkColorId: InkColorId) {
  return memoryInkColors[inkColorId];
}
