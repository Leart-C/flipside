import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memorySideToggleStyles = StyleSheet.create({
  control: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.small,
    marginTop: spacing.regular,
  },
  pressedControl: {
    opacity: 0.65,
  },
  printIcon: {
    width: 20,
    height: 16,
    borderColor: colors.mutedText,
    borderWidth: 1,
  },
  printIconShadow: {
    position: "absolute",
    top: 3,
    left: 3,
    width: 20,
    height: 16,
    borderColor: colors.border,
    borderWidth: 1,
  },
  label: {
    color: colors.mutedText,
    fontSize: 16,
    fontStyle: "italic",
  },
});
