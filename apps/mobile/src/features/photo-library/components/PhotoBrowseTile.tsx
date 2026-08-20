import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";

import { photoBrowseTileStyles } from "./PhotoBrowseTile.styles";

type PhotoBrowseTileProps = {
  onPress: () => void;
  size: number;
};

export function PhotoBrowseTile({ onPress, size }: PhotoBrowseTileProps) {
  return (
    <Pressable
      accessibilityHint="Opens your photo library"
      accessibilityLabel="Browse photos"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        photoBrowseTileStyles.container,
        {
          height: size,
          opacity: pressed ? 0.7 : 1,
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
