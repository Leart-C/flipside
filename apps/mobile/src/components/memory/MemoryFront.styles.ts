import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryFrontStyles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 4 / 5,
    padding: spacing.small,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 2,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.mutedText,
  },
  placeholderText: {
    color: colors.mutedText,
    fontSize: 18,
  },
});
