import { addListener } from "expo-media-library";
import { useEffect, useState } from "react";

export function usePhotoLibraryRevision(hasAccess: boolean) {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!hasAccess) {
      return;
    }

    const subscription = addListener(() => {
      setRevision((currentRevision) => currentRevision + 1);
    });

    return () => {
      subscription.remove();
    };
  }, [hasAccess]);

  return revision;
}
