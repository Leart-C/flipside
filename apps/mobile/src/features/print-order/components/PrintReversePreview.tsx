import { Text, View } from "react-native";

import { printReversePreviewStyles } from "./PrintReversePreview.styles";

type PrintReversePreviewProps = {
  fontFamily: string;
  inkColor: string;
  message: string;
};

export function PrintReversePreview({
  fontFamily,
  inkColor,
  message,
}: PrintReversePreviewProps) {
  return (
    <View style={printReversePreviewStyles.container}>
      <View
        accessibilityLabel="Preview of your words on the reverse"
        style={printReversePreviewStyles.paper}
      >
        <Text
          numberOfLines={4}
          style={[
            printReversePreviewStyles.message,
            {
              color: inkColor,
              fontFamily,
            },
          ]}
        >
          {message}
        </Text>
      </View>

      <View style={printReversePreviewStyles.description}>
        <Text style={printReversePreviewStyles.title}>
          Your words on the reverse
        </Text>

        <Text style={printReversePreviewStyles.subtitle}>
          Printed using your chosen handwriting and ink.
        </Text>
      </View>
    </View>
  );
}
