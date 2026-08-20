import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";

export const photoThumbnailStyles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
