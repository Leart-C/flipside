import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";

import { accountScreenStyles } from "./AccountScreen.styles";
import { AccountSection } from "./components/AccountSection";

export function AccountScreen() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <Screen>
      <View style={accountScreenStyles.content}>
        <Pressable
          accessibilityHint="Returns to your Shoebox"
          accessibilityLabel="Back"
          accessibilityRole="button"
          onPress={handleBack}
          style={({ pressed }) => [
            accountScreenStyles.backButton,
            pressed && accountScreenStyles.pressedButton,
          ]}
        >
          <Text style={accountScreenStyles.backLabel}>Back</Text>
        </Pressable>

        <View style={accountScreenStyles.introduction}>
          <Text style={accountScreenStyles.title}>Account</Text>

          <Text style={accountScreenStyles.subtitle}>
            Manage how you enter and leave Flipside.
          </Text>
        </View>

        <View style={accountScreenStyles.section}>
          <AccountSection />
        </View>
      </View>
    </Screen>
  );
}
