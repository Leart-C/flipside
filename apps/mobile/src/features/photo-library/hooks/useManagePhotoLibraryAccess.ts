import { presentPermissionsPicker } from "expo-media-library";
import { useState } from "react";

type PhotoLibraryAccessPrivileges = "all" | "limited" | "none";

export function useManagePhotoLibraryAccess(
  accessPrivileges: PhotoLibraryAccessPrivileges,
) {
  const [isManagingAccess, setIsManagingAccess] = useState(false);

  const [manageAccessFailed, setManageAccessFailed] = useState(false);

  const canManageAccess = accessPrivileges === "limited";

  async function manageAccess() {
    if (!canManageAccess || isManagingAccess) {
      return;
    }

    setManageAccessFailed(false);
    setIsManagingAccess(true);

    try {
      await presentPermissionsPicker(["photo"]);
    } catch {
      setManageAccessFailed(true);
    } finally {
      setIsManagingAccess(false);
    }
  }

  return {
    canManageAccess,
    isManagingAccess,
    manageAccess,
    manageAccessFailed,
  };
}
