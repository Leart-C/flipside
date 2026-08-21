import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Screen } from "@/components/layout/Screen";
import { colors } from "@/theme/colors";
import { WriteMemoryScreen } from "@/features/write-memory/WriteMemoryScreen";

import { editSavedMemoryScreenStyles } from "./EditSavedMemoryScreen.styles";
import { useSavedMemory } from "./hooks/useSavedMemory";

type EditSavedMemoryScreenProps = {
  memoryId: string;
};

export function EditSavedMemoryScreen({
  memoryId,
}: EditSavedMemoryScreenProps) {
  const router = useRouter();

  const {
    data: memory,
    isError,
    isLoading,
    refetch,
  } = useSavedMemory(memoryId);

  function returnToShoebox() {
    router.replace("/shoebox");
  }

  function retryLoading() {
    void refetch();
  }

  if (isLoading) {
    return (
      <Screen>
        <View style={editSavedMemoryScreenStyles.state}>
          <ActivityIndicator color={colors.action} />

          <Text style={editSavedMemoryScreenStyles.message}>
            Opening your memory...
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <View style={editSavedMemoryScreenStyles.state}>
          <Text style={editSavedMemoryScreenStyles.errorTitle}>
            This memory couldn&apos;t be opened.
          </Text>

          <Text style={editSavedMemoryScreenStyles.message}>
            Your saved memory has not been changed.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={retryLoading}
            style={({ pressed }) => [
              editSavedMemoryScreenStyles.primaryAction,
              pressed && editSavedMemoryScreenStyles.pressedAction,
            ]}
          >
            <Text style={editSavedMemoryScreenStyles.primaryActionLabel}>
              Try again
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={returnToShoebox}
            style={({ pressed }) => [
              editSavedMemoryScreenStyles.secondaryAction,
              pressed && editSavedMemoryScreenStyles.pressedAction,
            ]}
          >
            <Text style={editSavedMemoryScreenStyles.secondaryActionLabel}>
              Return to Shoebox
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  if (!memory) {
    return (
      <Screen>
        <View style={editSavedMemoryScreenStyles.state}>
          <Text style={editSavedMemoryScreenStyles.title}>
            Memory not found
          </Text>

          <Text style={editSavedMemoryScreenStyles.message}>
            This memory may have been removed from your Shoebox.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={returnToShoebox}
            style={({ pressed }) => [
              editSavedMemoryScreenStyles.primaryAction,
              pressed && editSavedMemoryScreenStyles.pressedAction,
            ]}
          >
            <Text style={editSavedMemoryScreenStyles.primaryActionLabel}>
              Return to Shoebox
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <WriteMemoryScreen
      backLabel="Shoebox"
      initialMemory={memory}
      key={memory.id}
      photoId={memory.photoId}
    />
  );
}
