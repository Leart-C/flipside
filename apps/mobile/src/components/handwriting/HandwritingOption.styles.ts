import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const handwritingOptionStyles = StyleSheet.create({
  option: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.regular,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
  },
  selectedOption: {
    borderColor: colors.action,
    borderWidth: 2,
  },
  lockedOption: {
    opacity: 0.55,
  },
  sample: {
    flex: 1,
    color: colors.text,
    fontSize: 22,
  },
  details: {
    alignItems: "flex-end",
    marginLeft: spacing.regular,
  },
  label: {
    color: colors.mutedText,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  keepsake: {
    marginTop: spacing.tiny,
    color: colors.action,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
