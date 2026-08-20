import { AssetField, MediaType, Query, type Asset } from "expo-media-library";
import { useEffect, useState } from "react";

import type { PhotoLibraryFilter } from "../types/PhotoLibraryFilter";
import type { PhotoLibraryPhoto } from "../types/PhotoLibraryPhoto";

const PHOTO_PAGE_SIZE = 30;

type PhotoLibraryPhotosState = {
  error: boolean;
  isLoading: boolean;
  loadedFilter: PhotoLibraryFilter | null;
  photos: PhotoLibraryPhoto[];
};

const noAccessState: PhotoLibraryPhotosState = {
  error: false,
  isLoading: false,
  loadedFilter: null,
  photos: [],
};

const loadingState: PhotoLibraryPhotosState = {
  error: false,
  isLoading: true,
  loadedFilter: null,
  photos: [],
};

function getStartOfCurrentYear() {
  const now = new Date();

  return new Date(now.getFullYear(), 0, 1).getTime();
}

function createPhotoQuery(filter: PhotoLibraryFilter) {
  const query = new Query().eq(AssetField.MEDIA_TYPE, MediaType.IMAGE);

  if (filter === "favourites") {
    query.eq(AssetField.IS_FAVORITE, true);
  }

  if (filter === "this-year") {
    query.gte(AssetField.CREATION_TIME, getStartOfCurrentYear());
  }

  return query
    .orderBy({
      key: AssetField.CREATION_TIME,
      ascending: false,
    })
    .limit(PHOTO_PAGE_SIZE);
}

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

export function usePhotoLibraryPhotos(
  hasAccess: boolean,
  filter: PhotoLibraryFilter,
) {
  const [state, setState] = useState<PhotoLibraryPhotosState>(loadingState);

  useEffect(() => {
    if (!hasAccess) {
      return;
    }

    let isActive = true;

    async function loadPhotos() {
      try {
        const assets = await createPhotoQuery(filter).exe();
        const photos = await Promise.all(assets.map(createPhoto));

        if (isActive) {
          setState({
            error: false,
            isLoading: false,
            loadedFilter: filter,
            photos,
          });
        }
      } catch {
        if (isActive) {
          setState({
            error: true,
            isLoading: false,
            loadedFilter: filter,
            photos: [],
          });
        }
      }
    }

    void loadPhotos();

    return () => {
      isActive = false;
    };
  }, [filter, hasAccess]);

  if (!hasAccess) {
    return noAccessState;
  }

  if (state.loadedFilter !== filter) {
    return loadingState;
  }

  return state;
}
