import { Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";

import { welcomeScreenStyles } from "./WelcomeScreen.styles";

export function WelcomeScreen() {
  return (
    <Screen>
      <View style={welcomeScreenStyles.content}>
        <Text style={welcomeScreenStyles.title}>Flipside</Text>
        <Text style={welcomeScreenStyles.message}>Every photo has a back.</Text>
      </View>
    </Screen>
  );
}
