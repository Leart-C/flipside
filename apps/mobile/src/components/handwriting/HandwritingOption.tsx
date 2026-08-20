import { Pressable, Text, View } from "react-native";

import type {
  HandwritingId,
  HandwritingOption as HandwritingOptionData,
} from "@/features/pick-your-hand/handwritingOptions";

import { handwritingOptionStyles } from "./HandwritingOption.styles";

type HandwritingOptionProps = {
  option: HandwritingOptionData;
  selected: boolean;
  onSelect: (id: HandwritingId) => void;
};

export function HandwritingOption({
  option,
  selected,
  onSelect,
}: HandwritingOptionProps) {
  function handlePress() {
    onSelect(option.id);
  }

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{
        checked: selected,
        disabled: option.requiresKeepsake,
      }}
      disabled={option.requiresKeepsake}
      onPress={handlePress}
      style={[
        handwritingOptionStyles.option,
        selected && handwritingOptionStyles.selectedOption,
        option.requiresKeepsake && handwritingOptionStyles.lockedOption,
      ]}
    >
      <Text
        style={[
          handwritingOptionStyles.sample,
          { fontFamily: option.fontFamily },
        ]}
      >
        The light was like that.
      </Text>

      <View style={handwritingOptionStyles.details}>
        <Text style={handwritingOptionStyles.label}>{option.label}</Text>

        {option.requiresKeepsake && (
          <Text style={handwritingOptionStyles.keepsake}>Keepsake</Text>
        )}
      </View>
    </Pressable>
  );
}
