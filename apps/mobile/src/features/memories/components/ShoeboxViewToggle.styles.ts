import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const shoeboxViewToggleStyles = StyleSheet.create({
  container: {
    width: 208,
    minHeight: 48,
    flexDirection: "row",
    padding: spacing.tiny,
    backgroundColor: colors.border,
    borderRadius: 24,
  },
  option: {
    flex: 1,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: colors.surface,

    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,

    elevation: 2,
  },
  pressedOption: {
    opacity: 0.7,
  },
  disabledOption: {
    opacity: 0.4,
  },
  label: {
    color: colors.mutedText,
    fontSize: 16,
  },
  selectedLabel: {
    color: colors.text,
    fontWeight: "500",
  },
});
