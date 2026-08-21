import { Pressable, View } from "react-native";

import { PrimaryButton } from "@/components/actions/PrimaryButton";

import { memoryActionBarStyles } from "./MemoryActionBar.styles";

type MemoryActionBarProps = {
  disabled: boolean;
  isSaving: boolean;
  onPrint?: () => void;
  onSaveToShoebox: () => void;
};

export function MemoryActionBar({
  disabled,
  isSaving,
  onPrint,
  onSaveToShoebox,
}: MemoryActionBarProps) {
  const printDisabled = disabled || isSaving || onPrint === undefined;

  const shoeboxDisabled = disabled || isSaving;

  return (
    <View style={memoryActionBarStyles.container}>
      <View style={memoryActionBarStyles.printAction}>
        <PrimaryButton
          disabled={printDisabled}
          label="Print this one"
          onPress={onPrint ?? (() => undefined)}
        />
      </View>

      <Pressable
        accessibilityHint="Saves this memory and returns to your photos"
        accessibilityLabel={isSaving ? "Saving memory" : "Save to Shoebox"}
        accessibilityRole="button"
        accessibilityState={{
          disabled: shoeboxDisabled,
        }}
        disabled={shoeboxDisabled}
        onPress={onSaveToShoebox}
        style={({ pressed }) => [
          memoryActionBarStyles.shoeboxAction,
          pressed && memoryActionBarStyles.pressedAction,
          shoeboxDisabled && memoryActionBarStyles.disabledAction,
        ]}
      >
        <View style={memoryActionBarStyles.stackIcon}>
          <View style={memoryActionBarStyles.backCard} />
          <View style={memoryActionBarStyles.frontCard} />
        </View>
      </Pressable>
    </View>
  );
}
