import { ActivityIndicator, Pressable, Text } from "react-native";

import { colors } from "@/theme/colors";

import { googleSignInButtonStyles } from "./GoogleSignInButton.styles";

type GoogleSignInButtonProps = {
  disabled: boolean;
  isLoading: boolean;
  onPress: () => void;
};

export function GoogleSignInButton({
  disabled,
  isLoading,
  onPress,
}: GoogleSignInButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityLabel={
        isLoading ? "Signing in with Google" : "Continue with Google"
      }
      accessibilityRole="button"
      accessibilityState={{
        busy: isLoading,
        disabled: isDisabled,
      }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        googleSignInButtonStyles.button,
        pressed && googleSignInButtonStyles.pressedButton,
        isDisabled && googleSignInButtonStyles.disabledButton,
      ]}
    >
      {isLoading && (
        <ActivityIndicator
          color={colors.text}
          size="small"
          style={googleSignInButtonStyles.indicator}
        />
      )}

      <Text style={googleSignInButtonStyles.label}>
        {isLoading ? "Opening Google..." : "Continue with Google"}
      </Text>
    </Pressable>
  );
}
