import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const shoeboxMemoryCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 4 / 5,
    justifyContent: "flex-start",
    padding: spacing.medium,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  pressedCard: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  message: {
    marginTop: spacing.large,
  },
});
