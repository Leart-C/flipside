import { TextInput, View } from "react-native";

import { colors } from "@/theme/colors";

import { memoryWritingCardStyles } from "./MemoryWritingCard.styles";

type MemoryWritingCardProps = {
  fontFamily: string;
  message: string;
  onMessageChange: (message: string) => void;
  inkColor: string;
};

export function MemoryWritingCard({
  fontFamily,
  message,
  onMessageChange,
  inkColor,
}: MemoryWritingCardProps) {
  return (
    <View style={memoryWritingCardStyles.card}>
      <TextInput
        accessibilityLabel="Memory message"
        multiline
        onChangeText={onMessageChange}
        placeholder="Write what you want to remember…"
        placeholderTextColor={colors.mutedText}
        selectionColor={inkColor}
        style={[
          memoryWritingCardStyles.input,
          {
            color: inkColor,
            fontFamily,
          },
        ]}
        textAlignVertical="top"
        value={message}
      />
    </View>
  );
}
