import { Pressable, Text } from "react-native";

import type { MemoryTextSizeId } from "@/domain/memory";

import {
  getMemoryTextSize,
  getNextMemoryTextSize,
} from "../memoryTextSizeOptions";
import { memoryTextSizeControlStyles } from "./MemoryTextSizeControl.styles";

type MemoryTextSizeControlProps = {
  onSelect: (textSize: MemoryTextSizeId) => void;
  selectedTextSize: MemoryTextSizeId;
};

export function MemoryTextSizeControl({
  onSelect,
  selectedTextSize,
}: MemoryTextSizeControlProps) {
  const selectedOption = getMemoryTextSize(selectedTextSize);

  function handlePress() {
    const nextOption = getNextMemoryTextSize(selectedTextSize);

    onSelect(nextOption.id);
  }

  return (
    <Pressable
      accessibilityHint="Cycles between small, medium and large"
      accessibilityLabel="Text size"
      accessibilityRole="button"
      accessibilityValue={{
        text: selectedOption.label,
      }}
      onPress={handlePress}
      style={({ pressed }) => [
        memoryTextSizeControlStyles.control,
        pressed && memoryTextSizeControlStyles.pressedControl,
      ]}
    >
      <Text style={memoryTextSizeControlStyles.label}>
        {selectedOption.label}
      </Text>
    </Pressable>
  );
}
