import { StyleSheet } from "react-native";

export const memoryFlipCardStyles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 4 / 5,
  },
  face: {
    ...StyleSheet.absoluteFill,
    backfaceVisibility: "hidden",
  },
});
