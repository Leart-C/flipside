import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";

import { photoBrowseTileStyles } from "./PhotoBrowseTile.styles";

type PhotoBrowseTileProps = {
  disabled?: boolean;
  onPress: () => void;
  size: number;
};

export function PhotoBrowseTile({
  onPress,
  size,
  disabled = false,
}: PhotoBrowseTileProps) {
  return (
    <Pressable
      accessibilityHint="Opens your photo library"
      accessibilityLabel="Browse photos"
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        photoBrowseTileStyles.container,
        {
          height: size,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
          width: size,
        },
      ]}
    >
      <SymbolView name="photo" size={32} tintColor="#918B82" weight="regular" />

      <View style={photoBrowseTileStyles.textArea}>
        <Text style={photoBrowseTileStyles.title}>Drop an{"\n"}image</Text>

        <Text numberOfLines={1} style={photoBrowseTileStyles.message}>
          or <Text style={photoBrowseTileStyles.link}>browse files</Text>
        </Text>
      </View>
    </Pressable>
  );
}
