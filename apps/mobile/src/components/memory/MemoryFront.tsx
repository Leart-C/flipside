import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";

import { memoryFrontStyles } from "./MemoryFront.styles";

type MemoryFrontProps = {
  style?: StyleProp<ViewStyle>;
};

export function MemoryFront({ style }: MemoryFrontProps) {
  return (
    <View
      accessible
      accessibilityLabel="Photo front"
      style={[memoryFrontStyles.card, style]}
    >
      <View style={memoryFrontStyles.placeholder}>
        <Text style={memoryFrontStyles.placeholderText}>a photo</Text>
      </View>
    </View>
  );
}
