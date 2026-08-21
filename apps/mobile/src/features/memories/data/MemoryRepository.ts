import type { SQLiteDatabase } from "expo-sqlite";

import type {
  MemoryDraft,
  MemorySyncStatus,
  SavedMemory,
} from "@/domain/memory";

type MemoryRow = {
  created_at: number;
  id: string;
  message: string;
  sync_status: MemorySyncStatus;
  updated_at: number;
};

export type MemoryRepository = {
  save: (draft: MemoryDraft) => Promise<SavedMemory>;
};

export function createMemoryRepository(
  database: SQLiteDatabase,
): MemoryRepository {
  async function save(draft: MemoryDraft): Promise<SavedMemory> {
    const message = draft.message.trim();

    if (message.length === 0) {
      throw new Error(
        "A memory must contain a message before it can be saved.",
      );
    }

    const now = Date.now();

    await database.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.runAsync(
        `
            INSERT INTO memories (
              id,
              source_photo_asset_id,
              message,
              handwriting,
              ink_color,
              text_size,
              print_layout_version,
              sync_status,
              created_at,
              updated_at
            )
            VALUES (
              lower(hex(randomblob(16))),
              $photoId,
              $message,
              $handwriting,
              $inkColor,
              $textSize,
              $printLayoutVersion,
              'local',
              $now,
              $now
            )
            ON CONFLICT(source_photo_asset_id)
            DO UPDATE SET
              message = excluded.message,
              handwriting = excluded.handwriting,
              ink_color = excluded.ink_color,
              text_size = excluded.text_size,
              print_layout_version =
                excluded.print_layout_version,
              sync_status = 'local',
              updated_at = excluded.updated_at
          `,
        {
          $handwriting: draft.handwriting,
          $inkColor: draft.inkColor,
          $message: message,
          $now: now,
          $photoId: draft.photoId,
          $printLayoutVersion: draft.printLayoutVersion,
          $textSize: draft.textSize,
        },
      );
    });

    const savedRow = await database.getFirstAsync<MemoryRow>(
      `
          SELECT
            id,
            message,
            sync_status,
            created_at,
            updated_at
          FROM memories
          WHERE source_photo_asset_id = ?
        `,
      draft.photoId,
    );

    if (!savedRow) {
      throw new Error("The saved memory could not be read from the database.");
    }

    return {
      ...draft,
      id: savedRow.id,
      message: savedRow.message,
      syncStatus: savedRow.sync_status,
      createdAt: savedRow.created_at,
      updatedAt: savedRow.updated_at,
    };
  }

  return {
    save,
  };
}
