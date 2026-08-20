import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { colors } from "@/theme/colors";

import { useSelectedPhoto } from "./hooks/useSelectedPhoto";
import { writeMemoryScreenStyles } from "./WriteMemoryScreen.styles";

type WriteMemoryScreenProps = {
  photoId: string;
};

export function WriteMemoryScreen({ photoId }: WriteMemoryScreenProps) {
  const router = useRouter();
  const { error, isLoading, uri } = useSelectedPhoto(photoId);

  return (
    <Screen>
      <View style={writeMemoryScreenStyles.content}>
        <Pressable
          accessibilityLabel="Return to photo library"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={writeMemoryScreenStyles.backButton}
        >
          <Text style={writeMemoryScreenStyles.backLabel}>Back</Text>
        </Pressable>
        <Text style={writeMemoryScreenStyles.title}>Your photo</Text>

        {isLoading && <ActivityIndicator color={colors.action} />}

        {error && (
          <Text style={writeMemoryScreenStyles.errorMessage}>
            This photo could not be opened.
          </Text>
        )}

        {!isLoading && !error && uri && (
          <View style={writeMemoryScreenStyles.photoFrame}>
            <Image
              accessibilityLabel="Selected memory photo"
              contentFit="cover"
              source={{ uri }}
              style={writeMemoryScreenStyles.photo}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}
