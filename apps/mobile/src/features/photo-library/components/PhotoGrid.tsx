import { FlatList, useWindowDimensions } from "react-native";

import { spacing } from "@/theme/spacing";

import type { PhotoLibraryPhoto } from "../types/PhotoLibraryPhoto";
import { PhotoBrowseTile } from "./PhotoBrowseTile";
import { PhotoThumbnail } from "./PhotoThumbnail";
import { photoGridStyles } from "./PhotoGrid.styles";

const COLUMN_COUNT = 3;
const GRID_SLOT_COUNT = 12;
const HORIZONTAL_SCREEN_PADDING = spacing.large * 2;
const TOTAL_COLUMN_GAP = spacing.tiny * (COLUMN_COUNT - 1);

type PhotoGridItem =
  | {
      id: string;
      type: "browse";
    }
  | {
      id: string;
      photo: PhotoLibraryPhoto;
      type: "photo";
    };

type PhotoGridProps = {
  browseDisabled: boolean;
  onBrowse: () => void;
  onPhotoSelect: (photo: PhotoLibraryPhoto) => void;
  photos: PhotoLibraryPhoto[];
  showBrowseTiles: boolean;
};

function createGridItems(
  photos: PhotoLibraryPhoto[],
  showBrowseTiles: boolean,
): PhotoGridItem[] {
  const photoItems: PhotoGridItem[] = photos.map((photo) => ({
    id: photo.id,
    photo,
    type: "photo",
  }));

  if (!showBrowseTiles) {
    return photoItems;
  }

  const browseItemCount = Math.max(GRID_SLOT_COUNT - photoItems.length, 0);

  const browseItems: PhotoGridItem[] = Array.from(
    { length: browseItemCount },
    (_, index) => ({
      id: `browse-${index}`,
      type: "browse",
    }),
  );

  return [...photoItems, ...browseItems];
}

export function PhotoGrid({
  browseDisabled,
  onBrowse,
  onPhotoSelect,
  photos,
  showBrowseTiles,
}: PhotoGridProps) {
  const { width: screenWidth } = useWindowDimensions();

  const availableWidth =
    screenWidth - HORIZONTAL_SCREEN_PADDING - TOTAL_COLUMN_GAP;

  const photoSize = Math.floor(availableWidth / COLUMN_COUNT);
  const gridItems = createGridItems(photos, showBrowseTiles);

  return (
    <FlatList
      columnWrapperStyle={photoGridStyles.row}
      contentContainerStyle={photoGridStyles.content}
      data={gridItems}
      keyExtractor={(item) => item.id}
      numColumns={COLUMN_COUNT}
      renderItem={({ item }) =>
        item.type === "photo" ? (
          <PhotoThumbnail
            photo={item.photo}
            size={photoSize}
            onPress={() => onPhotoSelect(item.photo)}
          />
        ) : (
          <PhotoBrowseTile
            disabled={browseDisabled}
            onPress={onBrowse}
            size={photoSize}
          />
        )
      }
      showsVerticalScrollIndicator={false}
      style={photoGridStyles.list}
    />
  );
}
