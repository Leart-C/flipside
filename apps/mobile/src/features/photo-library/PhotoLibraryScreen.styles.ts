import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const photoLibraryScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing.large,
    paddingHorizontal: spacing.large,
  },
  title: {
    flexShrink: 1,
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
  },
  message: {
    marginTop: spacing.small,
    color: colors.mutedText,
    fontSize: 18,
    fontStyle: "italic",
    lineHeight: 26,
  },
  permissionArea: {
    flex: 1,
  },
  grantedMessage: {
    marginTop: spacing.huge,
    color: colors.mutedText,
    fontSize: 16,
    textAlign: "center",
  },
  errorMessage: {
    color: colors.redInk,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.regular,
  },
  shoeboxButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing.regular,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
  },
  shoeboxLabel: {
    color: colors.action,
    fontSize: 14,
    fontWeight: "600",
  },
  pressedButton: {
    opacity: 0.7,
  },
});
