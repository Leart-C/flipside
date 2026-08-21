import { FlatList, useWindowDimensions, View } from "react-native";

import type { SavedMemory } from "@/domain/memory";
import { spacing } from "@/theme/spacing";

import { ShoeboxMemoryCard } from "./ShoeboxMemoryCard";
import { shoeboxMemoryGridStyles } from "./ShoeboxMemoryGrid.styles";

type ShoeboxMemoryGridProps = {
  isRefreshing: boolean;
  memories: SavedMemory[];
  onRefresh: () => void;
};

export function ShoeboxMemoryGrid({
  isRefreshing,
  memories,
  onRefresh,
}: ShoeboxMemoryGridProps) {
  const { width: screenWidth } = useWindowDimensions();

  const availableWidth = screenWidth - spacing.large * 2 - spacing.small * 2;

  const cardWidth = availableWidth / 3;

  return (
    <FlatList
      columnWrapperStyle={shoeboxMemoryGridStyles.row}
      contentContainerStyle={shoeboxMemoryGridStyles.content}
      data={memories}
      keyExtractor={(memory) => memory.id}
      numColumns={3}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      renderItem={({ item }) => (
        <View
          style={[
            shoeboxMemoryGridStyles.item,
            {
              width: cardWidth,
            },
          ]}
        >
          <ShoeboxMemoryCard memory={item} />
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
