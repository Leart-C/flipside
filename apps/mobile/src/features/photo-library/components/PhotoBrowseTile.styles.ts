import { StyleSheet } from "react-native";

import { spacing } from "@/theme/spacing";

export const photoBrowseTileStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.small,
    padding: spacing.tiny,
    backgroundColor: "#DED8CD",
    borderColor: "#A29B90",
    borderStyle: "dashed",
    borderWidth: 1.5,
  },
  textArea: {
    alignItems: "center",
    gap: spacing.small,
    width: "100%",
  },
  title: {
    color: "#5E5952",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "center",
  },
  message: {
    color: "#5E5952",
    fontSize: 11,
    lineHeight: 15,
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
});
