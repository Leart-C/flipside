import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Screen } from "@/components/layout/Screen";
import { colors } from "@/theme/colors";
import type { SavedMemory } from "@/domain/memory";
import { ShoeboxMemoryGrid } from "./components/ShoeboxMemoryGrid";
import { ShoeboxViewToggle } from "./components/ShoeboxViewToggle";
import { useShoeboxMemories } from "./hooks/useShoeboxMemories";
import type { ShoeboxView } from "./shoeboxView";
import { shoeboxScreenStyles } from "./ShoeboxScreen.styles";

export function ShoeboxScreen() {
  const router = useRouter();

  const [selectedView, setSelectedView] = useState<ShoeboxView>("backs");

  const {
    data: memories = [],
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useShoeboxMemories();

  const memoryCountLabel =
    memories.length === 1
      ? "1 written memory"
      : `${memories.length} written memories`;

  function handleAdd() {
    router.replace("/photos");
  }

  function handleMemoryPress(memory: SavedMemory) {
    router.push({
      pathname: "/memory/[memoryId]",
      params: {
        memoryId: memory.id,
      },
    });
  }

  function handleRefresh() {
    void refetch();
  }

  return (
    <Screen>
      <View style={shoeboxScreenStyles.content}>
        <View style={shoeboxScreenStyles.header}>
          <View style={shoeboxScreenStyles.titleRow}>
            <Text style={shoeboxScreenStyles.title}>Shoebox</Text>

            <Pressable
              accessibilityHint="Opens your photo library"
              accessibilityLabel="Add another memory"
              accessibilityRole="button"
              onPress={handleAdd}
              style={({ pressed }) => [
                shoeboxScreenStyles.addButton,
                pressed && shoeboxScreenStyles.pressedButton,
              ]}
            >
              <Text style={shoeboxScreenStyles.addLabel}>Add</Text>
            </Pressable>
          </View>

          <Text style={shoeboxScreenStyles.summary}>{memoryCountLabel}</Text>

          <View style={shoeboxScreenStyles.controls}>
            <ShoeboxViewToggle
              onSelect={setSelectedView}
              selectedView={selectedView}
            />

            <Text style={shoeboxScreenStyles.keepsakeLabel}>Keepsake</Text>
          </View>
        </View>

        {isLoading && (
          <View style={shoeboxScreenStyles.state}>
            <ActivityIndicator color={colors.action} />

            <Text style={shoeboxScreenStyles.stateMessage}>
              Opening your Shoebox...
            </Text>
          </View>
        )}

        {!isLoading && isError && (
          <View style={shoeboxScreenStyles.state}>
            <Text style={shoeboxScreenStyles.errorTitle}>
              Your Shoebox couldn&apos;t be opened.
            </Text>

            <Text style={shoeboxScreenStyles.stateMessage}>
              Your memories are still safely stored on this device.
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={handleRefresh}
              style={({ pressed }) => [
                shoeboxScreenStyles.retryButton,
                pressed && shoeboxScreenStyles.pressedButton,
              ]}
            >
              <Text style={shoeboxScreenStyles.retryLabel}>Try again</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && !isError && memories.length === 0 && (
          <View style={shoeboxScreenStyles.state}>
            <Text style={shoeboxScreenStyles.emptyTitle}>
              Your Shoebox is waiting.
            </Text>

            <Text style={shoeboxScreenStyles.stateMessage}>
              Write on a photo and save it here.
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={handleAdd}
              style={({ pressed }) => [
                shoeboxScreenStyles.retryButton,
                pressed && shoeboxScreenStyles.pressedButton,
              ]}
            >
              <Text style={shoeboxScreenStyles.retryLabel}>Choose a photo</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && !isError && memories.length > 0 && (
          <View style={shoeboxScreenStyles.grid}>
            <ShoeboxMemoryGrid
              isRefreshing={isRefetching}
              memories={memories}
              onRefresh={handleRefresh}
              onMemoryPress={handleMemoryPress}
              selectedView={selectedView}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}
