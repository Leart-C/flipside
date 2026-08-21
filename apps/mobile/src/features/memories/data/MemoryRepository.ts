import type { SQLiteDatabase } from "expo-sqlite";

import type {
  MemoryDraft,
  MemorySyncStatus,
  SavedMemory,
} from "@/domain/memory";

const LEGACY_OWNER_ID = "__legacy_unclaimed__";

type MemoryRow = {
  created_at: number;
  handwriting: SavedMemory["handwriting"];
  id: string;
  ink_color: SavedMemory["inkColor"];
  message: string;
  print_layout_version: number;
  source_photo_asset_id: string;
  sync_status: MemorySyncStatus;
  text_size: SavedMemory["textSize"];
  updated_at: number;
};

function mapMemoryRow(row: MemoryRow): SavedMemory {
  return {
    id: row.id,
    photoId: row.source_photo_asset_id,
    message: row.message,
    handwriting: row.handwriting,
    inkColor: row.ink_color,
    textSize: row.text_size,
    printLayoutVersion: row.print_layout_version,
    syncStatus: row.sync_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type MemoryRepository = {
  ownerId: string;
  claimLegacyMemories: () => Promise<void>;
  findAll: () => Promise<SavedMemory[]>;
  findById: (memoryId: string) => Promise<SavedMemory | null>;
  save: (draft: MemoryDraft) => Promise<SavedMemory>;
};

export function createMemoryRepository(
  database: SQLiteDatabase,
  ownerId: string,
): MemoryRepository {
  if (ownerId.trim().length === 0) {
    throw new Error("A memory repository requires an owner.");
  }

  async function claimLegacyMemories() {
    await database.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.runAsync(
        `
          DELETE FROM memories
          WHERE owner_id = $legacyOwnerId
            AND EXISTS (
              SELECT 1
              FROM memories AS owned_memory
              WHERE owned_memory.owner_id = $ownerId
                AND owned_memory.source_photo_asset_id =
                  memories.source_photo_asset_id
            )
        `,
        {
          $legacyOwnerId: LEGACY_OWNER_ID,
          $ownerId: ownerId,
        },
      );

      await transaction.runAsync(
        `
          UPDATE memories
          SET
            owner_id = $ownerId,
            sync_status = 'local',
            updated_at = $now
          WHERE owner_id = $legacyOwnerId
        `,
        {
          $legacyOwnerId: LEGACY_OWNER_ID,
          $now: Date.now(),
          $ownerId: ownerId,
        },
      );
    });
  }

  async function findAll(): Promise<SavedMemory[]> {
    const rows = await database.getAllAsync<MemoryRow>(
      `
        SELECT
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
        FROM memories
        WHERE owner_id = ?
        ORDER BY updated_at DESC
      `,
      ownerId,
    );

    return rows.map(mapMemoryRow);
  }

  async function findById(memoryId: string): Promise<SavedMemory | null> {
    const row = await database.getFirstAsync<MemoryRow>(
      `
        SELECT
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
        FROM memories
        WHERE id = ?
          AND owner_id = ?
        LIMIT 1
      `,
      memoryId,
      ownerId,
    );

    return row ? mapMemoryRow(row) : null;
  }

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
            owner_id,
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
            $ownerId,
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
          ON CONFLICT(owner_id, source_photo_asset_id)
          DO UPDATE SET
            message = excluded.message,
            handwriting = excluded.handwriting,
            ink_color = excluded.ink_color,
            text_size = excluded.text_size,
            print_layout_version = excluded.print_layout_version,
            sync_status = 'local',
            updated_at = excluded.updated_at
        `,
        {
          $handwriting: draft.handwriting,
          $inkColor: draft.inkColor,
          $message: message,
          $now: now,
          $ownerId: ownerId,
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
          source_photo_asset_id,
          message,
          handwriting,
          ink_color,
          text_size,
          print_layout_version,
          sync_status,
          created_at,
          updated_at
        FROM memories
        WHERE owner_id = ?
          AND source_photo_asset_id = ?
        LIMIT 1
      `,
      ownerId,
      draft.photoId,
    );

    if (!savedRow) {
      throw new Error("The saved memory could not be read from the database.");
    }

    return mapMemoryRow(savedRow);
  }

  return {
    ownerId,
    claimLegacyMemories,
    findAll,
    findById,
    save,
  };
}
