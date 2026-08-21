import { Image } from "expo-image";
import { ActivityIndicator, Text, View } from "react-native";

import type { SavedMemory } from "@/domain/memory";
import { usePhotoAssetUri } from "@/features/photo-library/hooks/usePhotoAssetUri";
import { colors } from "@/theme/colors";

import { shoeboxPhotoCardStyles } from "./ShoeboxPhotoCard.styles";

type ShoeboxPhotoCardProps = {
  memory: SavedMemory;
};

export function ShoeboxPhotoCard({ memory }: ShoeboxPhotoCardProps) {
  const { error, isLoading, uri } = usePhotoAssetUri(memory.photoId);

  return (
    <View style={shoeboxPhotoCardStyles.card}>
      {isLoading && (
        <View style={shoeboxPhotoCardStyles.state}>
          <ActivityIndicator color={colors.action} size="small" />
        </View>
      )}

      {!isLoading && error && (
        <View style={shoeboxPhotoCardStyles.state}>
          <Text style={shoeboxPhotoCardStyles.unavailableLabel}>
            Photo unavailable
          </Text>
        </View>
      )}

      {!isLoading && !error && uri && (
        <Image
          accessible={false}
          contentFit="cover"
          source={{ uri }}
          style={shoeboxPhotoCardStyles.photo}
          transition={150}
        />
      )}
    </View>
  );
}
