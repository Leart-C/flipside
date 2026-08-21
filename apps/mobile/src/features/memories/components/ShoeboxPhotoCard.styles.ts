import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const shoeboxPhotoCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 4 / 5,
    overflow: "hidden",
    padding: spacing.tiny,
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
  photo: {
    width: "100%",
    height: "100%",
  },
  state: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.small,
  },
  unavailableLabel: {
    color: colors.mutedText,
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
  },
});
