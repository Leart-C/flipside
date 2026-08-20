import type { InkColorId } from "@/domain/memory";
import { colors } from "@/theme/colors";

export type MemoryInkOption = {
  color: string;
  id: InkColorId;
  label: string;
};

export const memoryInkOptions: MemoryInkOption[] = [
  {
    color: colors.blackInk,
    id: "black",
    label: "Black ink",
  },
  {
    color: colors.blueInk,
    id: "blue",
    label: "Blue ink",
  },
  {
    color: colors.redInk,
    id: "red",
    label: "Red ink",
  },
  {
    color: colors.greenInk,
    id: "green",
    label: "Green ink",
  },
];

export function getMemoryInkColor(inkColorId: InkColorId) {
  const option = memoryInkOptions.find(
    (inkOption) => inkOption.id === inkColorId,
  );

  return option?.color ?? colors.blackInk;
}
