import { StyleSheet } from "react-native";

export const flippableMemoryStyles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 4 / 5,
  },
  face: {
    ...StyleSheet.absoluteFill,
    backfaceVisibility: "hidden",
  },
  card: {
    height: "100%",
  },
});
