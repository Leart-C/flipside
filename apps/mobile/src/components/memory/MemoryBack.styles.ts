import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryBackStyles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 4 / 5,
    justifyContent: "center",
    padding: spacing.large,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 2,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6,
  },
  message: {
    color: colors.blackInk,
    fontSize: 22,
    fontStyle: "italic",
    lineHeight: 32,
    textAlign: "center",
  },
});
