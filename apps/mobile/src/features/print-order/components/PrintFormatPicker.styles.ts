import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const printFormatPickerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.small,
  },
  option: {
    flex: 1,
    minWidth: 0,
    minHeight: 118,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.small,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: colors.paper,
    borderColor: colors.action,
    borderWidth: 2,
  },
  pressedOption: {
    opacity: 0.7,
  },
  paperPreview: {
    marginBottom: spacing.small,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
  },
  classicPreview: {
    width: 35,
    height: 44,
  },
  postcardPreview: {
    width: 42,
    height: 32,
  },
  squarePreview: {
    width: 38,
    height: 38,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  dimensions: {
    marginTop: spacing.tiny,
    color: colors.mutedText,
    fontSize: 11,
    textAlign: "center",
  },
});
