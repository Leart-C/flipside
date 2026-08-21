import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const authenticationScreenStyles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.large,
    paddingTop: spacing.huge,
    paddingBottom: spacing.large,
  },
  introduction: {
    alignItems: "center",
  },
  memoryPreview: {
    width: 150,
    height: 180,
    marginTop: spacing.large,
    marginBottom: spacing.huge,
  },
  photoSide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 116,
    height: 146,
    padding: spacing.small,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
    transform: [{ rotate: "-5deg" }],

    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 4,
  },
  photoShape: {
    flex: 1,
    backgroundColor: colors.blueInk,
    opacity: 0.75,
  },
  writingSide: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 116,
    height: 146,
    justifyContent: "center",
    paddingHorizontal: spacing.regular,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
    transform: [{ rotate: "5deg" }],

    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 4,
  },
  writingLine: {
    height: 2,
    backgroundColor: colors.greenInk,
    borderRadius: 1,
  },
  shortWritingLine: {
    width: "65%",
    height: 2,
    marginTop: spacing.small,
    backgroundColor: colors.greenInk,
    borderRadius: 1,
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    maxWidth: 320,
    marginTop: spacing.medium,
    color: colors.mutedText,
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    gap: spacing.medium,
  },
  errorMessage: {
    color: colors.redInk,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  legalMessage: {
    paddingHorizontal: spacing.regular,
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
});
