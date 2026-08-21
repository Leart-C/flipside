import { Asset } from "expo-media-library";
import { useEffect, useState } from "react";

type PhotoAssetState = {
  assetId: string;
  error: boolean;
  isLoading: boolean;
  uri: string | null;
};

function createLoadingState(assetId: string): PhotoAssetState {
  return {
    assetId,
    error: false,
    isLoading: true,
    uri: null,
  };
}

export function usePhotoAssetUri(assetId: string) {
  const [state, setState] = useState<PhotoAssetState>(() =>
    createLoadingState(assetId),
  );

  useEffect(() => {
    let isActive = true;

    async function loadPhotoAsset() {
      try {
        const photoAsset = new Asset(assetId);
        const uri = await photoAsset.getUri();

        if (isActive) {
          setState({
            assetId,
            error: false,
            isLoading: false,
            uri,
          });
        }
      } catch {
        if (isActive) {
          setState({
            assetId,
            error: true,
            isLoading: false,
            uri: null,
          });
        }
      }
    }

    void loadPhotoAsset();

    return () => {
      isActive = false;
    };
  }, [assetId]);

  if (state.assetId !== assetId) {
    return createLoadingState(assetId);
  }

  return state;
}
