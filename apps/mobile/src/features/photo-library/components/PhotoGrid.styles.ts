import { StyleSheet } from "react-native";

import { spacing } from "@/theme/spacing";

export const photoGridStyles = StyleSheet.create({
  list: {
    alignSelf: "stretch",
    marginTop: spacing.regular,
  },
  content: {
    gap: spacing.tiny,
    paddingBottom: spacing.extraLarge,
  },
  row: {
    gap: spacing.tiny,
  },
});
