import { ActivityIndicator, Pressable, Text } from "react-native";

import { colors } from "@/theme/colors";

import { signOutButtonStyles } from "./SignOutButton.styles";

type SignOutButtonProps = {
  disabled?: boolean;
  isLoading: boolean;
  onPress: () => void;
};

export function SignOutButton({
  disabled = false,
  isLoading,
  onPress,
}: SignOutButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityLabel={isLoading ? "Signing out" : "Sign out"}
      accessibilityRole="button"
      accessibilityState={{
        busy: isLoading,
        disabled: isDisabled,
      }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        signOutButtonStyles.button,
        pressed && signOutButtonStyles.pressedButton,
        isDisabled && signOutButtonStyles.disabledButton,
      ]}
    >
      {isLoading && (
        <ActivityIndicator
          color={colors.action}
          size="small"
          style={signOutButtonStyles.indicator}
        />
      )}

      <Text style={signOutButtonStyles.label}>
        {isLoading ? "Signing out..." : "Sign out"}
      </Text>
    </Pressable>
  );
}
