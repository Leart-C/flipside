import { useEffect, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable } from "react-native";
import Animated, {
  cancelAnimation,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { flippableMemoryStyles } from "./FlippableMemory.styles";
import { MemoryBack } from "./MemoryBack";
import { MemoryFront } from "./MemoryFront";

type FlippableMemoryProps = {
  message: string;
  onFirstFlip: () => void;
  style?: StyleProp<ViewStyle>;
};

export function FlippableMemory({
  message,
  onFirstFlip,
  style,
}: FlippableMemoryProps) {
  const [hasFlipped, setHasFlipped] = useState(false);

  const flipRotation = useSharedValue(0);
  const hintRotation = useSharedValue(0);

  useEffect(() => {
    const hintAnimation = withRepeat(
      withSequence(
        withDelay(
          900,
          withTiming(-8, {
            duration: 180,
            reduceMotion: ReduceMotion.System,
          }),
        ),
        withTiming(6, {
          duration: 220,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(0, {
          duration: 180,
          reduceMotion: ReduceMotion.System,
        }),
      ),
      -1,
      false,
      undefined,
      ReduceMotion.System,
    );

    hintRotation.set(hintAnimation);

    return () => {
      cancelAnimation(hintRotation);
      cancelAnimation(flipRotation);
    };
  }, [flipRotation, hintRotation]);

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${flipRotation.get() + hintRotation.get()}deg`,
      },
    ],
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${flipRotation.get() + 180}deg`,
      },
    ],
  }));

  function handleFlip() {
    if (hasFlipped) {
      return;
    }

    setHasFlipped(true);

    cancelAnimation(hintRotation);
    hintRotation.set(0);

    flipRotation.set(
      withTiming(180, {
        duration: 550,
        reduceMotion: ReduceMotion.System,
      }),
    );

    onFirstFlip();
  }

  return (
    <Pressable
      accessibilityLabel={
        hasFlipped ? "Written memory back" : "Photo front. Turn it over."
      }
      accessibilityRole="button"
      accessibilityState={{ disabled: hasFlipped }}
      disabled={hasFlipped}
      onPress={handleFlip}
      style={[flippableMemoryStyles.container, style]}
    >
      <Animated.View style={[flippableMemoryStyles.face, frontAnimatedStyle]}>
        <MemoryFront style={flippableMemoryStyles.card} />
      </Animated.View>

      <Animated.View style={[flippableMemoryStyles.face, backAnimatedStyle]}>
        <MemoryBack message={message} style={flippableMemoryStyles.card} />
      </Animated.View>
    </Pressable>
  );
}
