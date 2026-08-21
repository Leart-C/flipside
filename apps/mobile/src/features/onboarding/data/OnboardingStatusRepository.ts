import type { SQLiteDatabase } from "expo-sqlite";

const ONBOARDING_COMPLETED_KEY = "onboarding_completed";
const COMPLETED_VALUE = "true";

export type OnboardingStatusRepository = {
  hasCompletedOnboarding: () => Promise<boolean>;
  markOnboardingCompleted: () => Promise<void>;
};

export function createOnboardingStatusRepository(
  database: SQLiteDatabase,
): OnboardingStatusRepository {
  async function hasCompletedOnboarding() {
    const setting = await database.getFirstAsync<{
      setting_value: string;
    }>(
      `
        SELECT setting_value
        FROM app_settings
        WHERE setting_key = ?
        LIMIT 1
      `,
      ONBOARDING_COMPLETED_KEY,
    );

    return setting?.setting_value === COMPLETED_VALUE;
  }

  async function markOnboardingCompleted() {
    await database.runAsync(
      `
        INSERT INTO app_settings (
          setting_key,
          setting_value
        )
        VALUES (?, ?)
        ON CONFLICT(setting_key)
        DO UPDATE SET
          setting_value = excluded.setting_value
      `,
      ONBOARDING_COMPLETED_KEY,
      COMPLETED_VALUE,
    );
  }

  return {
    hasCompletedOnboarding,
    markOnboardingCompleted,
  };
}
