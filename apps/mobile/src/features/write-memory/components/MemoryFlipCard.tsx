import type { ReactNode } from "react";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { memoryFlipCardStyles } from "./MemoryFlipCard.styles";

const FLIP_DURATION = 600;

type MemoryFlipCardProps = {
  isShowingPhoto: boolean;
  photoSide: ReactNode;
  writingSide: ReactNode;
};

export function MemoryFlipCard({
  isShowingPhoto,
  photoSide,
  writingSide,
}: MemoryFlipCardProps) {
  const rotation = useSharedValue(isShowingPhoto ? 180 : 0);

  useEffect(() => {
    rotation.set(
      withTiming(isShowingPhoto ? 180 : 0, {
        duration: FLIP_DURATION,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.System,
      }),
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, [isShowingPhoto, rotation]);

  const writingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        perspective: 1000,
      },
      {
        rotateY: `${rotation.get()}deg`,
      },
    ],
  }));

  const photoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        perspective: 1000,
      },
      {
        rotateY: `${rotation.get() + 180}deg`,
      },
    ],
  }));

  return (
    <View style={memoryFlipCardStyles.container}>
      <Animated.View
        accessibilityElementsHidden={isShowingPhoto}
        importantForAccessibility={
          isShowingPhoto ? "no-hide-descendants" : "yes"
        }
        pointerEvents={isShowingPhoto ? "none" : "auto"}
        style={[memoryFlipCardStyles.face, writingAnimatedStyle]}
      >
        {writingSide}
      </Animated.View>

      <Animated.View
        accessibilityElementsHidden={!isShowingPhoto}
        importantForAccessibility={
          isShowingPhoto ? "yes" : "no-hide-descendants"
        }
        pointerEvents={isShowingPhoto ? "auto" : "none"}
        style={[memoryFlipCardStyles.face, photoAnimatedStyle]}
      >
        {photoSide}
      </Animated.View>
    </View>
  );
}
