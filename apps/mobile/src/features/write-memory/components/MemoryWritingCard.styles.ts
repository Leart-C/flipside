import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryWritingCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 4 / 5,
    padding: spacing.extraLarge,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  input: {
    flex: 1,
    padding: 0,
    color: colors.blackInk,
    fontSize: 29,
    lineHeight: 40,
  },
});
