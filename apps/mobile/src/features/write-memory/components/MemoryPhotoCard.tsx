import { Image } from "expo-image";
import { View } from "react-native";

import { memoryPhotoCardStyles } from "./MemoryPhotoCard.styles";

type MemoryPhotoCardProps = {
  uri: string;
};

export function MemoryPhotoCard({ uri }: MemoryPhotoCardProps) {
  return (
    <View
      accessible
      accessibilityLabel="Photo front"
      style={memoryPhotoCardStyles.card}
    >
      <Image
        accessible={false}
        contentFit="cover"
        source={{ uri }}
        style={memoryPhotoCardStyles.photo}
      />
    </View>
  );
}
