import type { MemoryTextSizeId } from "@/domain/memory";

export type MemoryTextSizeOption = {
  fontSize: number;
  id: MemoryTextSizeId;
  label: string;
  lineHeight: number;
};

export const memoryTextSizeOptions: MemoryTextSizeOption[] = [
  {
    fontSize: 23,
    id: "small",
    label: "Small",
    lineHeight: 32,
  },
  {
    fontSize: 29,
    id: "medium",
    label: "Medium",
    lineHeight: 40,
  },
  {
    fontSize: 35,
    id: "large",
    label: "Large",
    lineHeight: 48,
  },
];

export function getMemoryTextSize(textSizeId: MemoryTextSizeId) {
  return (
    memoryTextSizeOptions.find((option) => option.id === textSizeId) ??
    memoryTextSizeOptions[1]
  );
}

export function getNextMemoryTextSize(textSizeId: MemoryTextSizeId) {
  const currentIndex = memoryTextSizeOptions.findIndex(
    (option) => option.id === textSizeId,
  );

  const nextIndex = (currentIndex + 1) % memoryTextSizeOptions.length;

  return memoryTextSizeOptions[nextIndex];
}
