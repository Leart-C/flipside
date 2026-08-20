import { TextInput, View } from "react-native";

import { colors } from "@/theme/colors";

import { memoryWritingCardStyles } from "./MemoryWritingCard.styles";

type MemoryWritingCardProps = {
  fontFamily: string;
  fontSize: number;
  inkColor: string;
  lineHeight: number;
  message: string;
  onMessageChange: (message: string) => void;
};

export function MemoryWritingCard({
  fontFamily,
  fontSize,
  inkColor,
  lineHeight,
  message,
  onMessageChange,
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
            fontSize,
            lineHeight,
          },
        ]}
        textAlignVertical="top"
        value={message}
      />
    </View>
  );
}
