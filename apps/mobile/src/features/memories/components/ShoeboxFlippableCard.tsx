import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { SavedMemory } from "@/domain/memory";

import type { ShoeboxView } from "../shoeboxView";
import { shoeboxFlippableCardStyles } from "./ShoeboxFlippableCard.styles";
import { ShoeboxMemoryCard } from "./ShoeboxMemoryCard";
import { ShoeboxPhotoCard } from "./ShoeboxPhotoCard";

type ShoeboxFlippableCardProps = {
  memory: SavedMemory;
  onPress: (memory: SavedMemory) => void;
  selectedView: ShoeboxView;
};

export function ShoeboxFlippableCard({
  memory,
  onPress,
  selectedView,
}: ShoeboxFlippableCardProps) {
  const rotation = useSharedValue(selectedView === "fronts" ? 0 : 180);

  useEffect(() => {
    rotation.set(
      withTiming(selectedView === "fronts" ? 0 : 180, {
        duration: 480,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.System,
      }),
    );
  }, [rotation, selectedView]);

  const frontStyle = useAnimatedStyle(() => ({
    opacity: interpolate(rotation.get(), [0, 90, 180], [1, 0, 0]),
    transform: [
      {
        perspective: 800,
      },
      {
        rotateY: `${rotation.get()}deg`,
      },
    ],
  }));

  const backStyle = useAnimatedStyle(() => ({
    opacity: interpolate(rotation.get(), [0, 90, 180], [0, 0, 1]),
    transform: [
      {
        perspective: 800,
      },
      {
        rotateY: `${rotation.get() + 180}deg`,
      },
    ],
  }));

  const visibleSide =
    selectedView === "fronts" ? "photo front" : "written back";

  return (
    <Pressable
      accessibilityHint="Opens this saved memory"
      accessibilityLabel={`Open ${visibleSide}: ${memory.message}`}
      accessibilityRole="button"
      onPress={() => onPress(memory)}
      style={({ pressed }) => [
        shoeboxFlippableCardStyles.container,
        pressed && shoeboxFlippableCardStyles.pressed,
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[shoeboxFlippableCardStyles.side, frontStyle]}
      >
        <ShoeboxPhotoCard memory={memory} />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[shoeboxFlippableCardStyles.side, backStyle]}
      >
        <ShoeboxMemoryCard memory={memory} />
      </Animated.View>
    </Pressable>
  );
}
