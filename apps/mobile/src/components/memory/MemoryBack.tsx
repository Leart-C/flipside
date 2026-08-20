import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";

import { memoryBackStyles } from "./MemoryBack.styles";

type MemoryBackProps = {
  message: string;
  style?: StyleProp<ViewStyle>;
};

export function MemoryBack({ message, style }: MemoryBackProps) {
  return (
    <View
      accessible
      accessibilityLabel={`Memory back: ${message}`}
      style={[memoryBackStyles.card, style]}
    >
      <Text style={memoryBackStyles.message}>{message}</Text>
    </View>
  );
}
