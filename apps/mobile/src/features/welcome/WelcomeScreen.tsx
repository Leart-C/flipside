import { Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";

import { welcomeScreenStyles } from "./WelcomeScreen.styles";
import { useRouter } from "expo-router";
import { PrimaryButton } from "@/components/actions/PrimaryButton";

export function WelcomeScreen() {
  const router = useRouter();

  function handleShowMe(){
    router.push("/turn-one-over");
  }

  return (
    <Screen>
      <View style={welcomeScreenStyles.content}>
        <View style={welcomeScreenStyles.copy}>
          <Text style={welcomeScreenStyles.title}>Flipside</Text>
          <Text style={welcomeScreenStyles.message}>
            Every photo has a back.
          </Text>
        </View>

        <PrimaryButton label="Show me" onPress={handleShowMe} />
      </View>
    </Screen>
  );
}
