import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryInkPickerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginRight: spacing.regular,
    color: colors.mutedText,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  options: {
    flexDirection: "row",
    gap: spacing.small,
  },
  option: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    borderRadius: 22,
    borderWidth: 1.5,
  },
  selectedOption: {
    borderColor: colors.mutedText,
  },
  pressedOption: {
    opacity: 0.65,
  },
  swatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
