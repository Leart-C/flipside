import type { ReactNode } from "react";
import { useEffect } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { memoryControlsFadeStyles } from "./MemoryControlsFade.styles";

const FADE_DURATION = 250;

type MemoryControlsFadeProps = {
  children: ReactNode;
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
};

export function MemoryControlsFade({
  children,
  isVisible,
  style,
}: MemoryControlsFadeProps) {
  const opacity = useSharedValue(isVisible ? 1 : 0);

  useEffect(() => {
    opacity.set(
      withTiming(isVisible ? 1 : 0, {
        duration: FADE_DURATION,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      }),
    );

    return () => {
      cancelAnimation(opacity);
    };
  }, [isVisible, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
  }));

  return (
    <Animated.View
      accessibilityElementsHidden={!isVisible}
      importantForAccessibility={isVisible ? "yes" : "no-hide-descendants"}
      pointerEvents={isVisible ? "auto" : "none"}
      style={[memoryControlsFadeStyles.container, style, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
}
