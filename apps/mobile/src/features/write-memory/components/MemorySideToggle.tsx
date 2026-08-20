import { Pressable, Text, View } from "react-native";

import { memorySideToggleStyles } from "./MemorySideToggle.styles";

type MemorySideToggleProps = {
  isShowingPhoto: boolean;
  onPress: () => void;
};

export function MemorySideToggle({
  isShowingPhoto,
  onPress,
}: MemorySideToggleProps) {
  const label = isShowingPhoto
    ? "Turn over to the memory"
    : "Turn back to the photo";

  return (
    <Pressable
      accessibilityHint="Switches between the front and back of this memory"
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        memorySideToggleStyles.control,
        pressed && memorySideToggleStyles.pressedControl,
      ]}
    >
      <View style={memorySideToggleStyles.printIcon}>
        <View style={memorySideToggleStyles.printIconShadow} />
      </View>

      <Text style={memorySideToggleStyles.label}>{label}</Text>
    </Pressable>
  );
}
