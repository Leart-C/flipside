import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const photoLibraryPermissionPromptStyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.large,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "600",
  },
  message: {
    marginTop: spacing.small,
    marginBottom: spacing.large,
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
  },
});
