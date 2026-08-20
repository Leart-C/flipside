import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const welcomeScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.large,
    paddingBottom: spacing.regular,
    paddingTop: spacing.regular,
  },
  copy: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
});
