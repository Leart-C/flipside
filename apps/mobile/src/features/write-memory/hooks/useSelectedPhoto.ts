import { Asset } from "expo-media-library";
import { useEffect, useState } from "react";

type SelectedPhotoState = {
  error: boolean;
  isLoading: boolean;
  photoId: string;
  uri: string | null;
};

function createLoadingState(photoId: string): SelectedPhotoState {
  return {
    error: false,
    isLoading: true,
    photoId,
    uri: null,
  };
}

export function useSelectedPhoto(photoId: string) {
  const [state, setState] = useState<SelectedPhotoState>(() =>
    createLoadingState(photoId),
  );

  useEffect(() => {
    let isActive = true;

    async function loadPhoto() {
      try {
        const photo = new Asset(photoId);
        const uri = await photo.getUri();

        if (isActive) {
          setState({
            error: false,
            isLoading: false,
            photoId,
            uri,
          });
        }
      } catch {
        if (isActive) {
          setState({
            error: true,
            isLoading: false,
            photoId,
            uri: null,
          });
        }
      }
    }

    void loadPhoto();

    return () => {
      isActive = false;
    };
  }, [photoId]);

  if (state.photoId !== photoId) {
    return createLoadingState(photoId);
  }

  return state;
}
