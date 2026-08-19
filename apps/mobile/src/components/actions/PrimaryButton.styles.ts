import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const primaryButtonStyles = StyleSheet.create({
  button: {
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.large,
    backgroundColor: colors.action,
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    color: colors.onAction,
    fontSize: 18,
    fontWeight: "500",
  },
});
