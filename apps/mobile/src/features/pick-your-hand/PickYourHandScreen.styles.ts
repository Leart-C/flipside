import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const pickYourHandScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing.regular,
    paddingHorizontal: spacing.large,
    paddingBottom: spacing.regular,
  },
  copy: {
    marginTop: spacing.extraLarge,
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
  },
  message: {
    marginTop: spacing.medium,
    color: colors.mutedText,
    fontSize: 18,
    lineHeight: 26,
  },
  optionsList: {
    flex: 1,
    marginTop: spacing.large,
  },
  optionsContent: {
    gap: spacing.medium,
    paddingBottom: spacing.large,
  },
  errorMessage: {
    marginBottom: spacing.medium,
    color: colors.redInk,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
