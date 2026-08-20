import { Pressable, Text, View } from "react-native";

import { handwritingOptions } from "@/components/handwriting/handwritingOptions";
import type { HandwritingId } from "@/domain/handwriting";

import { memoryHandwritingPickerStyles } from "./MemoryHandwritingPicker.styles";

type MemoryHandwritingPickerProps = {
  onSelect: (handwriting: HandwritingId) => void;
  selectedHandwriting: HandwritingId;
};

export function MemoryHandwritingPicker({
  onSelect,
  selectedHandwriting,
}: MemoryHandwritingPickerProps) {
  return (
    <View
      accessibilityRole="radiogroup"
      style={memoryHandwritingPickerStyles.container}
    >
      {handwritingOptions.map((option) => {
        const isSelected = option.id === selectedHandwriting;

        return (
          <Pressable
            accessibilityLabel={`${option.label} handwriting`}
            accessibilityRole="radio"
            accessibilityState={{
              checked: isSelected,
              disabled: option.requiresKeepsake,
            }}
            disabled={option.requiresKeepsake}
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={({ pressed }) => [
              memoryHandwritingPickerStyles.option,
              isSelected && memoryHandwritingPickerStyles.selectedOption,
              option.requiresKeepsake &&
                memoryHandwritingPickerStyles.lockedOption,
              pressed && memoryHandwritingPickerStyles.pressedOption,
            ]}
          >
            {option.requiresKeepsake && (
              <View style={memoryHandwritingPickerStyles.keepsakeBadge}>
                <Text style={memoryHandwritingPickerStyles.keepsakeBadgeText}>
                  K
                </Text>
              </View>
            )}

            <Text
              style={[
                memoryHandwritingPickerStyles.sample,
                {
                  fontFamily: option.fontFamily,
                },
              ]}
            >
              Aa
            </Text>

            <Text numberOfLines={1} style={memoryHandwritingPickerStyles.label}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
