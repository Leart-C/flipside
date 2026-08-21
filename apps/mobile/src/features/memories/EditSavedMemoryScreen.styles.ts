import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const editSavedMemoryScreenStyles = StyleSheet.create({
  state: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.extraLarge,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  errorTitle: {
    color: colors.redInk,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    marginTop: spacing.small,
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  primaryAction: {
    minHeight: 48,
    justifyContent: "center",
    marginTop: spacing.large,
    paddingHorizontal: spacing.large,
    backgroundColor: colors.action,
    borderRadius: 24,
  },
  primaryActionLabel: {
    color: colors.onAction,
    fontSize: 16,
    fontWeight: "500",
  },
  secondaryAction: {
    minHeight: 44,
    justifyContent: "center",
    marginTop: spacing.small,
    paddingHorizontal: spacing.regular,
  },
  secondaryActionLabel: {
    color: colors.action,
    fontSize: 15,
    fontWeight: "500",
  },
  pressedAction: {
    opacity: 0.7,
  },
});
