import { useState } from "react";
import { ActivityIndicator, Linking, Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { colors } from "@/theme/colors";

import { PhotoLibraryPermissionPrompt } from "./components/PhotoLibraryPermissionPrompt";
import { usePhotoLibraryPermission } from "./hooks/usePhotoLibraryPermission";
import { photoLibraryScreenStyles } from "./PhotoLibraryScreen.styles";

export function PhotoLibraryScreen() {
  const { canAskAgain, hasAccess, isLoading, requestPermission, status } =
    usePhotoLibraryPermission();

  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [permissionRequestFailed, setPermissionRequestFailed] = useState(false);

  const mustOpenSettings = status === "denied" && !canAskAgain;

  async function handleRequestPermission() {
    setPermissionRequestFailed(false);
    setIsRequestingPermission(true);

    try {
      await requestPermission();
    } catch {
      setPermissionRequestFailed(true);
    } finally {
      setIsRequestingPermission(false);
    }
  }

  function handleOpenSettings() {
    void Linking.openSettings();
  }

  return (
    <Screen>
      <View style={photoLibraryScreenStyles.content}>
        <Text style={photoLibraryScreenStyles.title}>Choose a photo</Text>
        <Text style={photoLibraryScreenStyles.message}>
          From your library — pick one to write on.
        </Text>

        <View style={photoLibraryScreenStyles.permissionArea}>
          {isLoading && <ActivityIndicator color={colors.action} />}

          {!isLoading && hasAccess && (
            <Text style={photoLibraryScreenStyles.grantedMessage}>
              Photo access granted.
            </Text>
          )}

          {!isLoading && !hasAccess && (
            <PhotoLibraryPermissionPrompt
              actionLabel={
                mustOpenSettings
                  ? "Open settings"
                  : isRequestingPermission
                    ? "Opening..."
                    : "Choose photos"
              }
              disabled={isRequestingPermission}
              message={
                permissionRequestFailed
                  ? "Flipside could not open photo access. Please try again."
                  : mustOpenSettings
                    ? "Photo access is turned off. Open Settings to choose which photos Flipside may use."
                    : "Choose the photos Flipside may show. Your library stays on this device until you select a photo."
              }
              onAction={
                mustOpenSettings ? handleOpenSettings : handleRequestPermission
              }
              title={
                mustOpenSettings
                  ? "Photo access is off"
                  : "Choose from your library"
              }
            />
          )}
        </View>
      </View>
    </Screen>
  );
}
