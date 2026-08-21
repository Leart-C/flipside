import { Pressable, Text, View } from "react-native";

import type { PrintFormatId } from "../printFormats";
import { printFormats } from "../printFormats";
import { printFormatPickerStyles } from "./PrintFormatPicker.styles";

type PrintFormatPickerProps = {
  onSelect: (formatId: PrintFormatId) => void;
  selectedFormatId: PrintFormatId;
};

export function PrintFormatPicker({
  onSelect,
  selectedFormatId,
}: PrintFormatPickerProps) {
  return (
    <View
      accessibilityRole="radiogroup"
      style={printFormatPickerStyles.container}
    >
      {printFormats.map((format) => {
        const isSelected = format.id === selectedFormatId;

        return (
          <Pressable
            accessibilityLabel={`${format.label}, ${format.dimensions} inches`}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            key={format.id}
            onPress={() => onSelect(format.id)}
            style={({ pressed }) => [
              printFormatPickerStyles.option,
              isSelected && printFormatPickerStyles.selectedOption,
              pressed && printFormatPickerStyles.pressedOption,
            ]}
          >
            <View
              style={[
                printFormatPickerStyles.paperPreview,
                format.id === "classic-4x5" &&
                  printFormatPickerStyles.classicPreview,
                format.id === "postcard-4x6" &&
                  printFormatPickerStyles.postcardPreview,
                format.id === "square-5x5" &&
                  printFormatPickerStyles.squarePreview,
              ]}
            />

            <Text style={printFormatPickerStyles.label}>{format.label}</Text>

            <Text style={printFormatPickerStyles.dimensions}>
              {format.dimensions}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
