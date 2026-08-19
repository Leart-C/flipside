import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { screenStyles } from "./Screen.styles";

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  return <SafeAreaView style={screenStyles.container}>{children}</SafeAreaView>;
}
