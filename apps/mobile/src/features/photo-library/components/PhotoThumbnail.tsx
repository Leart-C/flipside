import { Image } from "expo-image";
import { Pressable } from "react-native";

import type { PhotoLibraryPhoto } from "../types/PhotoLibraryPhoto";
import { photoThumbnailStyles } from "./PhotoThumbnail.styles";

type PhotoThumbnailProps = {
  onPress: () => void;
  photo: PhotoLibraryPhoto;
  size: number;
};

export function PhotoThumbnail({ onPress, photo, size }: PhotoThumbnailProps) {
  return (
    <Pressable
      accessibilityHint="Opens the back so you can write a memory"
      accessibilityLabel={`Choose ${photo.filename ?? "photo"}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        photoThumbnailStyles.container,
        {
          height: size,
          opacity: pressed ? 0.75 : 1,
          width: size,
        },
      ]}
    >
      <Image
        accessible={false}
        contentFit="cover"
        source={{ uri: photo.uri }}
        style={photoThumbnailStyles.image}
        transition={150}
      />
    </Pressable>
  );
}
