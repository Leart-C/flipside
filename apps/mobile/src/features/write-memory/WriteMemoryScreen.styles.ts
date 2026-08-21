import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const writeMemoryScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.large,
    paddingTop: spacing.regular,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
  },
  backLabel: {
    color: colors.action,
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    marginTop: spacing.regular,
    marginBottom: spacing.large,
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
  },
  keyboardSpace: {
    flex: 1,
    minHeight: spacing.regular,
  },
  errorMessage: {
    color: colors.redInk,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  controls: {
    marginTop: spacing.small,
  },
  secondaryControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.regular,
  },
  saveError: {
    marginTop: spacing.small,
    color: colors.redInk,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
