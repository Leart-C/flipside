import { Pressable, Text } from "react-native";

import { accountButtonStyles } from "./AccountButton.styles";

type AccountButtonProps = {
  onPress: () => void;
};

export function AccountButton({ onPress }: AccountButtonProps) {
  return (
    <Pressable
      accessibilityHint="Opens your account settings"
      accessibilityLabel="Account"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        accountButtonStyles.button,
        pressed && accountButtonStyles.pressedButton,
      ]}
    >
      <Text style={accountButtonStyles.label}>Account</Text>
    </Pressable>
  );
}
