import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const writeMemoryScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.large,
    paddingTop: spacing.regular,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
  },
  backLabel: {
    color: colors.action,
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    marginTop: spacing.regular,
    marginBottom: spacing.large,
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
  },
  photoFrame: {
    width: "100%",
    aspectRatio: 4 / 5,
    padding: spacing.small,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
  },
  photo: {
    height: "100%",
    width: "100%",
  },
  errorMessage: {
    color: colors.redInk,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
