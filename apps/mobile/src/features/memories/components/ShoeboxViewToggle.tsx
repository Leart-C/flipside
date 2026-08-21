import { Pressable, Text, View } from "react-native";

import type { ShoeboxView } from "../shoeboxView";
import { shoeboxViewToggleStyles } from "./ShoeboxViewToggle.styles";

type ShoeboxViewToggleProps = {
  frontsDisabled?: boolean;
  onSelect: (view: ShoeboxView) => void;
  selectedView: ShoeboxView;
};

const viewOptions: {
  label: string;
  value: ShoeboxView;
}[] = [
  {
    label: "Fronts",
    value: "fronts",
  },
  {
    label: "Backs",
    value: "backs",
  },
];

export function ShoeboxViewToggle({
  frontsDisabled = false,
  onSelect,
  selectedView,
}: ShoeboxViewToggleProps) {
  return (
    <View style={shoeboxViewToggleStyles.container}>
      {viewOptions.map((option) => {
        const isSelected = option.value === selectedView;
        const isDisabled = option.value === "fronts" && frontsDisabled;

        return (
          <Pressable
            accessibilityLabel={`Show memory ${option.label.toLowerCase()}`}
            accessibilityRole="tab"
            accessibilityState={{
              disabled: isDisabled,
              selected: isSelected,
            }}
            disabled={isDisabled}
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={({ pressed }) => [
              shoeboxViewToggleStyles.option,
              isSelected && shoeboxViewToggleStyles.selectedOption,
              pressed && shoeboxViewToggleStyles.pressedOption,
              isDisabled && shoeboxViewToggleStyles.disabledOption,
            ]}
          >
            <Text
              style={[
                shoeboxViewToggleStyles.label,
                isSelected && shoeboxViewToggleStyles.selectedLabel,
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
