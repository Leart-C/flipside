import { Pressable, Text } from "react-native";

import type { MemoryTextSizeId, SavedMemory } from "@/domain/memory";
import { fontFamilies } from "@/theme/fonts";
import { getMemoryInkColor } from "@/theme/memoryInkColors";

import { shoeboxMemoryCardStyles } from "./ShoeboxMemoryCard.styles";

type ShoeboxMemoryCardProps = {
  memory: SavedMemory;
  onPress: (memory: SavedMemory) => void;
};

const previewTextSizes: Record<
  MemoryTextSizeId,
  {
    fontSize: number;
    lineHeight: number;
  }
> = {
  small: {
    fontSize: 10,
    lineHeight: 14,
  },
  medium: {
    fontSize: 12,
    lineHeight: 16,
  },
  large: {
    fontSize: 14,
    lineHeight: 18,
  },
};

export function ShoeboxMemoryCard({ memory, onPress }: ShoeboxMemoryCardProps) {
  const textSize = previewTextSizes[memory.textSize];

  return (
    <Pressable
      accessibilityHint="Opens this saved memory"
      accessibilityLabel={`Memory: ${memory.message}`}
      accessibilityRole="button"
      onPress={() => onPress(memory)}
      style={({ pressed }) => [
        shoeboxMemoryCardStyles.card,
        pressed && shoeboxMemoryCardStyles.pressedCard,
      ]}
    >
      <Text
        numberOfLines={8}
        style={[
          shoeboxMemoryCardStyles.message,
          {
            color: getMemoryInkColor(memory.inkColor),
            fontFamily: fontFamilies[memory.handwriting],
            fontSize: textSize.fontSize,
            lineHeight: textSize.lineHeight,
          },
        ]}
      >
        {memory.message}
      </Text>
    </Pressable>
  );
}
