import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const memoryPhotoCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 4 / 5,
    padding: spacing.small,
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
  photo: {
    height: "100%",
    width: "100%",
  },
});
