import { usePermissions } from "expo-media-library";

export function usePhotoLibraryPermission() {
  const [permission, requestPermission] = usePermissions({
    writeOnly: false,
    granularPermissions: ["photo"],
  });

  const accessPrivileges = permission?.accessPrivileges ?? "none";

  const hasAccess =
    permission?.granted === true &&
    (accessPrivileges === "all" || accessPrivileges === "limited");

  return {
    accessPrivileges,
    canAskAgain: permission?.canAskAgain ?? true,
    hasAccess,
    isLoading: permission === null,
    requestPermission,
    status: permission?.status ?? "undetermined",
  };
}
