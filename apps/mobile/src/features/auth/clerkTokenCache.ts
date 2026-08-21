import type { TokenCache } from "@clerk/expo";
import * as SecureStore from "expo-secure-store";

const tokenNamespace = "flipside.clerk.v1";
const secureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
};

let legacyTokenCleanup: Promise<void> | null = null;

function getNamespacedKey(key: string) {
  return `${tokenNamespace}.${key}`;
}

function removeLegacyToken(key: string) {
  legacyTokenCleanup ??= SecureStore.deleteItemAsync(key, secureStoreOptions);

  return legacyTokenCleanup;
}

export const clerkTokenCache: TokenCache = {
  async getToken(key) {
    await removeLegacyToken(key);

    const namespacedKey = getNamespacedKey(key);

    try {
      return await SecureStore.getItemAsync(namespacedKey, secureStoreOptions);
    } catch {
      await SecureStore.deleteItemAsync(namespacedKey, secureStoreOptions);
      return null;
    }
  },

  async saveToken(key, token) {
    await removeLegacyToken(key);
    await SecureStore.setItemAsync(
      getNamespacedKey(key),
      token,
      secureStoreOptions,
    );
  },

  async clearToken(key) {
    await SecureStore.deleteItemAsync(
      getNamespacedKey(key),
      secureStoreOptions,
    );
  },
};
