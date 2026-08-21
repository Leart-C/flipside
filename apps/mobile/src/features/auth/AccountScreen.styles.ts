import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const accountScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.large,
    paddingTop: spacing.regular,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
    paddingRight: spacing.regular,
  },
  pressedButton: {
    opacity: 0.65,
  },
  backLabel: {
    color: colors.action,
    fontSize: 16,
    fontWeight: "500",
  },
  introduction: {
    marginTop: spacing.regular,
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: spacing.tiny,
    color: colors.mutedText,
    fontSize: 17,
    fontStyle: "italic",
    lineHeight: 24,
  },
  section: {
    marginTop: spacing.extraLarge,
    padding: spacing.large,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
  },
});
