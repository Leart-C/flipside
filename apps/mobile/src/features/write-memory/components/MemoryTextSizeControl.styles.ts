import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryTextSizeControlStyles = StyleSheet.create({
  control: {
    minWidth: 104,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.regular,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
  },
  pressedControl: {
    opacity: 0.65,
  },
  label: {
    color: colors.text,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
