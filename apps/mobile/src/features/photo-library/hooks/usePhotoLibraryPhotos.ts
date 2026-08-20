import {
  AssetField,
  type AssetMetadata,
  MediaType,
  Query,
} from "expo-media-library";
import { useEffect, useState } from "react";

const PHOTO_PAGE_SIZE = 30;

type PhotoLibraryPhotosState = {
  error: boolean;
  isLoading: boolean;
  photos: AssetMetadata[];
};

const noAccessState: PhotoLibraryPhotosState = {
  error: false,
  isLoading: false,
  photos: [],
};

const loadingState: PhotoLibraryPhotosState = {
  error: false,
  isLoading: true,
  photos: [],
};

export function usePhotoLibraryPhotos(hasAccess: boolean) {
  const [state, setState] = useState<PhotoLibraryPhotosState>(loadingState);

  useEffect(() => {
    if (!hasAccess) {
      return;
    }

    let isActive = true;

    async function loadPhotos() {
      try {
        const photos = await new Query()
          .eq(AssetField.MEDIA_TYPE, MediaType.IMAGE)
          .orderBy({
            key: AssetField.CREATION_TIME,
            ascending: false,
          })
          .limit(PHOTO_PAGE_SIZE)
          .exeForMetadata();

        if (isActive) {
          setState({
            error: false,
            isLoading: false,
            photos,
          });
        }
      } catch {
        if (isActive) {
          setState({
            error: true,
            isLoading: false,
            photos: [],
          });
        }
      }
    }

    void loadPhotos();

    return () => {
      isActive = false;
    };
  }, [hasAccess]);

  if (!hasAccess) {
    return noAccessState;
  }

  return state;
}
