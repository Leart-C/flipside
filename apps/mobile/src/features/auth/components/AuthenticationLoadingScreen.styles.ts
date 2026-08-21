import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const authenticationLoadingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.small,
    backgroundColor: colors.canvas,
  },
  message: {
    color: colors.mutedText,
    fontSize: 14,
  },
});
