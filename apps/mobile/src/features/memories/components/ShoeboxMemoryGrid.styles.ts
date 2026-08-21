import { StyleSheet } from "react-native";

import { spacing } from "@/theme/spacing";

export const shoeboxMemoryGridStyles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.large,
    paddingTop: spacing.regular,
    paddingBottom: spacing.huge,
    rowGap: spacing.regular,
  },
  row: {
    gap: spacing.small,
  },
  item: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
