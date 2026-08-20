import { Pressable, Text, View } from "react-native";

import type { PhotoLibraryFilter as PhotoLibraryFilterValue } from "../types/PhotoLibraryFilter";
import { photoLibraryFilterStyles } from "./PhotoLibraryFilter.styles";

const filterOptions: {
  label: string;
  value: PhotoLibraryFilterValue;
}[] = [
  {
    label: "Recents",
    value: "recents",
  },
  {
    label: "Favourites",
    value: "favourites",
  },
  {
    label: "This year",
    value: "this-year",
  },
];

type PhotoLibraryFilterProps = {
  onSelect: (filter: PhotoLibraryFilterValue) => void;
  selectedFilter: PhotoLibraryFilterValue;
};

export function PhotoLibraryFilter({
  onSelect,
  selectedFilter,
}: PhotoLibraryFilterProps) {
  return (
    <View style={photoLibraryFilterStyles.container}>
      {filterOptions.map((option) => {
        const isSelected = option.value === selectedFilter;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={({ pressed }) => [
              photoLibraryFilterStyles.option,
              isSelected && photoLibraryFilterStyles.selectedOption,
              pressed && photoLibraryFilterStyles.pressedOption,
            ]}
          >
            <Text
              style={[
                photoLibraryFilterStyles.label,
                isSelected && photoLibraryFilterStyles.selectedLabel,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
