import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const accountSectionStyles = StyleSheet.create({
  container: {
    gap: spacing.regular,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "600",
  },
  message: {
    marginTop: spacing.tiny,
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  errorMessage: {
    color: colors.redInk,
    fontSize: 14,
    lineHeight: 20,
  },
});
