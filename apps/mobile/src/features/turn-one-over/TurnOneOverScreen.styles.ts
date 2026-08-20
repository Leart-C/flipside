import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const turnOneOverScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing.regular,
    paddingHorizontal: spacing.large,
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
  memoryArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  memoryCard: {
    width: "72%",
    maxWidth: 320,
  },
});
