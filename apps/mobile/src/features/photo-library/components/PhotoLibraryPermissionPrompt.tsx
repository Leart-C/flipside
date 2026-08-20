import { Text, View } from "react-native";

import { PrimaryButton } from "@/components/actions/PrimaryButton";

import { photoLibraryPermissionPromptStyles } from "./PhotoLibraryPermissionPrompt.styles";

type PhotoLibraryPermissionPromptProps = {
  actionLabel: string;
  disabled?: boolean;
  message: string;
  onAction: () => void;
  title: string;
};

export function PhotoLibraryPermissionPrompt({
  actionLabel,
  disabled = false,
  message,
  onAction,
  title,
}: PhotoLibraryPermissionPromptProps) {
  return (
    <View style={photoLibraryPermissionPromptStyles.container}>
      <Text style={photoLibraryPermissionPromptStyles.title}>{title}</Text>
      <Text style={photoLibraryPermissionPromptStyles.message}>{message}</Text>

      <PrimaryButton
        disabled={disabled}
        label={actionLabel}
        onPress={onAction}
      />
    </View>
  );
}
