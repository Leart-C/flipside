import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export const printOrderSheetStyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(41, 37, 31, 0.45)",
  },
  sheet: {
    maxHeight: "92%",
    paddingTop: spacing.small,
    paddingHorizontal: spacing.large,
    backgroundColor: colors.canvas,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    marginBottom: spacing.regular,
    backgroundColor: colors.border,
    borderRadius: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  eyebrow: {
    color: colors.action,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    marginTop: spacing.tiny,
    color: colors.text,
    fontSize: 28,
    fontWeight: "600",
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
  },
  pressedButton: {
    opacity: 0.7,
  },
  closeLabel: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 30,
  },
  content: {
    gap: spacing.large,
    paddingTop: spacing.large,
    paddingBottom: spacing.small,
  },
  sectionLabel: {
    marginBottom: spacing.small,
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceDescription: {
    flex: 1,
  },
  priceLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  priceNote: {
    marginTop: spacing.tiny,
    color: colors.mutedText,
    fontSize: 13,
  },
  price: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "600",
  },
  checkoutNote: {
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
});
