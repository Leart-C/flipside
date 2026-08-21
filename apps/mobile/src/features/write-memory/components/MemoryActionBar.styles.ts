import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryActionBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.small,
    marginTop: spacing.regular,
  },
  printAction: {
    flex: 1,
  },
  shoeboxAction: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
  },
  pressedAction: {
    opacity: 0.7,
  },
  disabledAction: {
    opacity: 0.4,
  },
  stackIcon: {
    width: 26,
    height: 24,
  },
  backCard: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 20,
    height: 17,
    backgroundColor: colors.border,
    borderColor: colors.mutedText,
    borderWidth: 1,
  },
  frontCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 20,
    height: 17,
    backgroundColor: colors.paper,
    borderColor: colors.text,
    borderWidth: 1,
  },
});
