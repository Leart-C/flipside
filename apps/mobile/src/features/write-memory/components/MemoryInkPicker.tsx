import { Pressable, Text, View } from "react-native";

import type { InkColorId } from "@/domain/memory";

import { memoryInkOptions } from "../memoryInkOptions";
import { memoryInkPickerStyles } from "./MemoryInkPicker.styles";

type MemoryInkPickerProps = {
  onSelect: (inkColor: InkColorId) => void;
  selectedInkColor: InkColorId;
};

export function MemoryInkPicker({
  onSelect,
  selectedInkColor,
}: MemoryInkPickerProps) {
  return (
    <View
      accessibilityRole="radiogroup"
      style={memoryInkPickerStyles.container}
    >
      <Text style={memoryInkPickerStyles.label}>Ink</Text>

      <View style={memoryInkPickerStyles.options}>
        {memoryInkOptions.map((option) => {
          const isSelected = option.id === selectedInkColor;

          return (
            <Pressable
              accessibilityLabel={option.label}
              accessibilityRole="radio"
              accessibilityState={{
                checked: isSelected,
              }}
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={({ pressed }) => [
                memoryInkPickerStyles.option,
                isSelected && memoryInkPickerStyles.selectedOption,
                pressed && memoryInkPickerStyles.pressedOption,
              ]}
            >
              <View
                style={[
                  memoryInkPickerStyles.swatch,
                  {
                    backgroundColor: option.color,
                  },
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
