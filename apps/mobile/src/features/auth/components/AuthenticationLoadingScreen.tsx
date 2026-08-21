import { ActivityIndicator, Text, View } from "react-native";

import { colors } from "@/theme/colors";

import { authenticationLoadingScreenStyles } from "./AuthenticationLoadingScreen.styles";

export function AuthenticationLoadingScreen() {
  return (
    <View style={authenticationLoadingScreenStyles.container}>
      <ActivityIndicator color={colors.action} size="small" />
      <Text style={authenticationLoadingScreenStyles.message}>
        Opening Flipside…
      </Text>
    </View>
  );
}
