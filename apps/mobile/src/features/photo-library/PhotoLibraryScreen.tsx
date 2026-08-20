import { useState } from "react";
import { ActivityIndicator, Linking, Text, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { colors } from "@/theme/colors";

import { PhotoGrid } from "./components/PhotoGrid";
import { PhotoLibraryFilter } from "./components/PhotoLibraryFilter";
import { PhotoLibraryPermissionPrompt } from "./components/PhotoLibraryPermissionPrompt";
import { usePhotoLibraryPermission } from "./hooks/usePhotoLibraryPermission";
import { usePhotoLibraryPhotos } from "./hooks/usePhotoLibraryPhotos";
import { photoLibraryScreenStyles } from "./PhotoLibraryScreen.styles";
import { usePhotoLibraryRevision } from "./hooks/usePhotoLibraryRevision";
import type { PhotoLibraryFilter as PhotoLibraryFilterValue } from "./types/PhotoLibraryFilter";

export function PhotoLibraryScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<PhotoLibraryFilterValue>("recents");

  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const [permissionRequestFailed, setPermissionRequestFailed] = useState(false);

  const {
    canAskAgain,
    hasAccess,
    isLoading: isPermissionLoading,
    requestPermission,
    status,
  } = usePhotoLibraryPermission();

  const photoLibraryRevision = usePhotoLibraryRevision(hasAccess);

  const {
    error: photosFailed,
    isLoading: photosLoading,
    photos,
  } = usePhotoLibraryPhotos(hasAccess, selectedFilter, photoLibraryRevision);

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

        {!isPermissionLoading && hasAccess && (
          <PhotoLibraryFilter
            onSelect={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        )}

        <View style={photoLibraryScreenStyles.permissionArea}>
          {isPermissionLoading && <ActivityIndicator color={colors.action} />}

          {!isPermissionLoading && !hasAccess && (
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

          {!isPermissionLoading && hasAccess && photosLoading && (
            <ActivityIndicator color={colors.action} />
          )}

          {!isPermissionLoading && hasAccess && photosFailed && (
            <Text style={photoLibraryScreenStyles.errorMessage}>
              We couldn&apos;t load your photos. Please try again.
            </Text>
          )}

          {!isPermissionLoading &&
            hasAccess &&
            !photosLoading &&
            !photosFailed && (
              <PhotoGrid onBrowse={handleOpenSettings} photos={photos} />
            )}
        </View>
      </View>
    </Screen>
  );
}
