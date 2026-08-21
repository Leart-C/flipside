import { Text, View } from "react-native";

import { useSignOut } from "../hooks/useSignOut";
import { accountSectionStyles } from "./AccountSection.styles";
import { SignOutButton } from "./SignOutButton";

export function AccountSection() {
  const { isSigningOut, signOutFailed, signOutCurrentUser } = useSignOut();

  return (
    <View style={accountSectionStyles.container}>
      <View>
        <Text style={accountSectionStyles.title}>Your account</Text>

        <Text style={accountSectionStyles.message}>
          Sign out when you want to use a different Flipside account.
        </Text>
      </View>

      {signOutFailed && (
        <Text
          accessibilityLiveRegion="polite"
          style={accountSectionStyles.errorMessage}
        >
          You couldn&apos;t be signed out. Please try again.
        </Text>
      )}

      <SignOutButton
        isLoading={isSigningOut}
        onPress={() => {
          void signOutCurrentUser();
        }}
      />
    </View>
  );
}
