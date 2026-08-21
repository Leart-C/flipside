import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const printReversePreviewStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.regular,
    padding: spacing.medium,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
  },
  paper: {
    width: 72,
    height: 88,
    justifyContent: "flex-start",
    padding: spacing.small,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
  },
  message: {
    fontSize: 10,
    lineHeight: 13,
  },
  description: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: spacing.tiny,
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
});
