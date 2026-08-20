import { TextInput, View } from "react-native";

import { colors } from "@/theme/colors";

import { memoryWritingCardStyles } from "./MemoryWritingCard.styles";

type MemoryWritingCardProps = {
  fontFamily: string;
  message: string;
  onMessageChange: (message: string) => void;
};

export function MemoryWritingCard({
  fontFamily,
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
        selectionColor={colors.action}
        style={[
          memoryWritingCardStyles.input,
          {
            fontFamily,
          },
        ]}
        textAlignVertical="top"
        value={message}
      />
    </View>
  );
}
