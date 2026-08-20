import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const onboardingProgressStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
  },
  step: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  completedStep: {
    backgroundColor: colors.action,
  },
  currentStep: {
    width: 24,
    backgroundColor: colors.action,
  },
});
