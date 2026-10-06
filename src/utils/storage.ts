/**
 * Pragmatic local storage wrapper with memory fallback and safe JSON parsing.
 */

const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__pb_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const memoryStore: Record<string, string> = {};

export const storage = {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      if (isStorageAvailable()) {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
          return JSON.parse(item) as T;
        }
      } else if (memoryStore[key] !== undefined) {
        return JSON.parse(memoryStore[key]) as T;
      }
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
    }
    return defaultValue;
  },

  setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      if (isStorageAvailable()) {
        window.localStorage.setItem(key, serialized);
      } else {
        memoryStore[key] = serialized;
      }
    } catch (err) {
      console.warn(`Error writing localStorage key "${key}":`, err);
    }
  },

  removeItem(key: string): void {
    try {
      if (isStorageAvailable()) {
        window.localStorage.removeItem(key);
      } else {
        delete memoryStore[key];
      }
    } catch (err) {
      console.warn(`Error removing localStorage key "${key}":`, err);
    }
  },
};

export const STORAGE_KEYS = {
  SAVED_ARTWORKS: 'pb_saved_artworks_v1',
  GUESTBOOK_ENTRIES: 'pb_guestbook_entries_v1',
  FOLLOWED_ARTISTS: 'pb_followed_artists_v1',
  LIKED_ARTWORKS: 'pb_liked_artworks_v1',
  PURR_COUNTS: 'pb_purr_counts_v1',
  RECENT_ORDERS: 'pb_recent_orders_v1',
  AMBIENT_AUDIO: 'pb_ambient_audio_pref_v1',
};
