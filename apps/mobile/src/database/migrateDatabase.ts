import type { SQLiteDatabase } from "expo-sqlite";

import { databaseConfig } from "./databaseConfig";

type DatabaseVersionRow = {
  user_version: number;
};

export async function migrateDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
  `);

  const versionRow = await database.getFirstAsync<DatabaseVersionRow>(
    "PRAGMA user_version",
  );

  const currentVersion = versionRow?.user_version ?? 0;

  if (currentVersion >= databaseConfig.version) {
    return;
  }

  await database.withExclusiveTransactionAsync(async (transaction) => {
    if (currentVersion < 1) {
      await transaction.execAsync(`
          CREATE TABLE IF NOT EXISTS memories (
            id TEXT PRIMARY KEY NOT NULL,
            owner_id TEXT,
            source_photo_asset_id TEXT NOT NULL UNIQUE,
            local_photo_uri TEXT,
            message TEXT NOT NULL,
            handwriting TEXT NOT NULL CHECK (
              handwriting IN (
                'note',
                'letter',
                'sketch',
                'longhand',
                'ledger'
              )
            ),
            ink_color TEXT NOT NULL CHECK (
              ink_color IN (
                'black',
                'blue',
                'red',
                'green'
              )
            ),
            text_size TEXT NOT NULL CHECK (
              text_size IN (
                'small',
                'medium',
                'large'
              )
            ),
            print_layout_version INTEGER NOT NULL,
            sync_status TEXT NOT NULL DEFAULT 'local' CHECK (
              sync_status IN (
                'local',
                'pending',
                'synced',
                'failed'
              )
            ),
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
          );

          CREATE INDEX IF NOT EXISTS memories_updated_at_index
          ON memories(updated_at DESC);

          PRAGMA user_version = 1;
        `);
    }

    if (currentVersion < 2) {
      await transaction.execAsync(`
          ALTER TABLE memories RENAME TO memories_before_ownership;

          CREATE TABLE memories (
            id TEXT PRIMARY KEY NOT NULL,
            owner_id TEXT NOT NULL,
            source_photo_asset_id TEXT NOT NULL,
            local_photo_uri TEXT,
            message TEXT NOT NULL,
            handwriting TEXT NOT NULL CHECK (
              handwriting IN (
                'note',
                'letter',
                'sketch',
                'longhand',
                'ledger'
              )
            ),
            ink_color TEXT NOT NULL CHECK (
              ink_color IN (
                'black',
                'blue',
                'red',
                'green'
              )
            ),
            text_size TEXT NOT NULL CHECK (
              text_size IN (
                'small',
                'medium',
                'large'
              )
            ),
            print_layout_version INTEGER NOT NULL,
            sync_status TEXT NOT NULL DEFAULT 'local' CHECK (
              sync_status IN (
                'local',
                'pending',
                'synced',
                'failed'
              )
            ),
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            UNIQUE(owner_id, source_photo_asset_id)
          );

          INSERT INTO memories (
            id,
            owner_id,
            source_photo_asset_id,
            local_photo_uri,
            message,
            handwriting,
            ink_color,
            text_size,
            print_layout_version,
            sync_status,
            created_at,
            updated_at
          )
          SELECT
            id,
            COALESCE(owner_id, '__legacy_unclaimed__'),
            source_photo_asset_id,
            local_photo_uri,
            message,
            handwriting,
            ink_color,
            text_size,
            print_layout_version,
            sync_status,
            created_at,
            updated_at
          FROM memories_before_ownership;

          DROP TABLE memories_before_ownership;

          CREATE INDEX memories_owner_updated_at_index
          ON memories(owner_id, updated_at DESC);

          PRAGMA user_version = 2;
        `);
    }
  });
}
