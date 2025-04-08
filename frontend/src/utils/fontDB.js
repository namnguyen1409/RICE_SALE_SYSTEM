import { openDB } from 'idb';

const DB_NAME = 'GoogleFontDB';
const STORE_NAME = 'fonts';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'family' });
      }
    },
  });
};

export const saveFontsToDB = async (fonts) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  for (const font of fonts) {
    await store.put(font);
  }
  await tx.done;
};

export const getFontsFromDB = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const clearFontsFromDB = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
