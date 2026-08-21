import { StyleSheet } from "react-native";

export const shoeboxFlippableCardStyles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 4 / 5,
  },
  side: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backfaceVisibility: "hidden",
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});
