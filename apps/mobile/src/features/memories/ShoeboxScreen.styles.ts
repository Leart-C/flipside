import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const shoeboxScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.regular,
    paddingHorizontal: spacing.large,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
  },
  addButton: {
    minWidth: 58,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 29,
    borderWidth: 1,
  },
  addLabel: {
    color: colors.text,
    fontSize: 16,
  },
  pressedButton: {
    opacity: 0.7,
  },
  summary: {
    marginTop: spacing.tiny,
    color: colors.mutedText,
    fontSize: 17,
    fontStyle: "italic",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.large,
  },
  keepsakeLabel: {
    color: colors.mutedText,
    fontSize: 16,
    opacity: 0.5,
  },
  grid: {
    flex: 1,
  },
  state: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.extraLarge,
  },
  stateMessage: {
    marginTop: spacing.small,
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  errorTitle: {
    color: colors.redInk,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  retryButton: {
    minHeight: 48,
    justifyContent: "center",
    marginTop: spacing.large,
    paddingHorizontal: spacing.large,
    backgroundColor: colors.action,
    borderRadius: 24,
  },
  retryLabel: {
    color: colors.onAction,
    fontSize: 16,
    fontWeight: "500",
  },
});
