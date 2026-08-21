import { FlatList, useWindowDimensions, View } from "react-native";

import type { SavedMemory } from "@/domain/memory";
import { spacing } from "@/theme/spacing";
import type { ShoeboxView } from "../shoeboxView";
import { ShoeboxFlippableCard } from "./ShoeboxFlippableCard";
import { shoeboxMemoryGridStyles } from "./ShoeboxMemoryGrid.styles";

type ShoeboxMemoryGridProps = {
  isRefreshing: boolean;
  memories: SavedMemory[];
  onRefresh: () => void;
  onMemoryPress: (memory: SavedMemory) => void;
  selectedView: ShoeboxView;
};

export function ShoeboxMemoryGrid({
  isRefreshing,
  memories,
  onRefresh,
  onMemoryPress,
  selectedView,
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
          <ShoeboxFlippableCard
            memory={item}
            onPress={onMemoryPress}
            selectedView={selectedView}
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
