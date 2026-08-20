import { Image } from "expo-image";
import { View } from "react-native";

import type { PhotoLibraryPhoto } from "../types/PhotoLibraryPhoto";
import { photoThumbnailStyles } from "./PhotoThumbnail.styles";

type PhotoThumbnailProps = {
  photo: PhotoLibraryPhoto;
  size: number;
};

export function PhotoThumbnail({ photo, size }: PhotoThumbnailProps) {
  return (
    <View
      style={[
        photoThumbnailStyles.container,
        {
          height: size,
          width: size,
        },
      ]}
    >
      <Image
        accessibilityLabel={photo.filename ?? "Photo from your library"}
        contentFit="cover"
        source={{ uri: photo.uri }}
        style={photoThumbnailStyles.image}
        transition={150}
      />
    </View>
  );
}
