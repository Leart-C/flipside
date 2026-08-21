import type { InkColorId } from "@/domain/memory";
import { getMemoryInkColor } from "@/theme/memoryInkColors";

export type MemoryInkOption = {
  color: string;
  id: InkColorId;
  label: string;
};

export const memoryInkOptions: MemoryInkOption[] = [
  {
    color: getMemoryInkColor("black"),
    id: "black",
    label: "Black ink",
  },
  {
    color: getMemoryInkColor("blue"),
    id: "blue",
    label: "Blue ink",
  },
  {
    color: getMemoryInkColor("red"),
    id: "red",
    label: "Red ink",
  },
  {
    color: getMemoryInkColor("green"),
    id: "green",
    label: "Green ink",
  },
];
