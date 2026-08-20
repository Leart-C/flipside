import { AssetField, MediaType, Query, type Asset } from "expo-media-library";
import { useEffect, useState } from "react";

import type { PhotoLibraryPhoto } from "../types/PhotoLibraryPhoto";

const PHOTO_PAGE_SIZE = 30;

type PhotoLibraryPhotosState = {
  error: boolean;
  isLoading: boolean;
  photos: PhotoLibraryPhoto[];
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

async function createPhoto(asset: Asset): Promise<PhotoLibraryPhoto> {
  const [filename, uri] = await Promise.all([
    asset.getFilename(),
    asset.getUri(),
  ]);

  return {
    id: asset.id,
    filename,
    uri,
  };
}

export function usePhotoLibraryPhotos(hasAccess: boolean) {
  const [state, setState] = useState<PhotoLibraryPhotosState>(loadingState);

  useEffect(() => {
    if (!hasAccess) {
      return;
    }

    let isActive = true;

    async function loadPhotos() {
      try {
        const assets = await new Query()
          .eq(AssetField.MEDIA_TYPE, MediaType.IMAGE)
          .orderBy({
            key: AssetField.CREATION_TIME,
            ascending: false,
          })
          .limit(PHOTO_PAGE_SIZE)
          .exe();

        const photos = await Promise.all(assets.map(createPhoto));

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
