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
});
