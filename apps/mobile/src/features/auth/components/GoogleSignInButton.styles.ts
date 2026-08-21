import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const googleSignInButtonStyles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.huge,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,

    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },
  pressedButton: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  disabledButton: {
    opacity: 0.5,
  },
  indicator: {
    position: "absolute",
    left: spacing.regular,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
});
