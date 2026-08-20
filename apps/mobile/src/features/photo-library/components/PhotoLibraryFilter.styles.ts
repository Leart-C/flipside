import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const photoLibraryFilterStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: spacing.large,
    padding: spacing.tiny,
    backgroundColor: colors.border,
    borderRadius: 999,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: spacing.small,
    borderRadius: 999,
  },
  selectedOption: {
    backgroundColor: colors.paper,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressedOption: {
    opacity: 0.7,
  },
  label: {
    color: colors.mutedText,
    fontSize: 14,
  },
  selectedLabel: {
    color: colors.text,
    fontWeight: "500",
  },
});
