import Dexie from 'dexie';

export const db = new Dexie('vaultifyDB');

db.version(1).stores({
  // The '++id' means it's an auto-incrementing primary key.
  // The '&' means the property should be unique.
  // The '*' means it's a multi-entry index (for arrays like tags).
  bookmarks: '++id, type, title, *tags',
});
