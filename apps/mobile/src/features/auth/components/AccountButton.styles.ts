import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const accountButtonStyles = StyleSheet.create({
  button: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing.regular,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
  },
  pressedButton: {
    opacity: 0.7,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
});
