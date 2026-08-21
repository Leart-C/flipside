import { StyleSheet } from "react-native";

export const memoryFlipCardStyles = StyleSheet.create({
  container: {
    width: "78%",
    aspectRatio: 4 / 5,
    alignSelf: "center",
  },
  face: {
    ...StyleSheet.absoluteFill,
    backfaceVisibility: "hidden",
  },
});
