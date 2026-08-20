import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryHandwritingPickerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.small,
  },
  option: {
    flex: 1,
    minWidth: 0,
    minHeight: 76,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.tiny,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 4,
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: colors.paper,
    borderColor: colors.action,
  },
  lockedOption: {
    opacity: 0.5,
  },
  pressedOption: {
    opacity: 0.65,
  },
  sample: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 30,
  },
  label: {
    marginTop: spacing.tiny,
    color: colors.mutedText,
    fontSize: 8,
    letterSpacing: 1,
    textAlign: "center",
    textTransform: "uppercase",
  },
  keepsakeBadge: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.action,
    borderRadius: 4,
  },
  keepsakeBadgeText: {
    color: colors.onAction,
    fontSize: 8,
    fontWeight: "700",
  },
});
