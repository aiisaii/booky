const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const dbPath = process.env.DB_PATH || './vaultify.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

const createTables = () => {
  const createBookmarksTable = `
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK(type IN ('standard', 'people', 'torrent')),
      title TEXT NOT NULL,
      notes TEXT,
      preview_image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      -- JSON data fields for different types
      standard_data TEXT, -- JSON object: { url, description }
      people_data TEXT,   -- JSON object: { name, avatar, bio, socialLinks }
      torrent_data TEXT   -- JSON object: { magnetLink, torrentFile, size, files, seeders, leechers }
    );
  `;

  const createTagsTable = `
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `;

  const createBookmarkTagsTable = `
    CREATE TABLE IF NOT EXISTS bookmark_tags (
      bookmark_id INTEGER,
      tag_id INTEGER,
      FOREIGN KEY(bookmark_id) REFERENCES bookmarks(id) ON DELETE CASCADE,
      FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (bookmark_id, tag_id)
    );
  `;

  const createCollectionsTable = `
    CREATE TABLE IF NOT EXISTS collections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT
    );
  `;

  const createBookmarkCollectionsTable = `
    CREATE TABLE IF NOT EXISTS bookmark_collections (
      bookmark_id INTEGER,
      collection_id INTEGER,
      FOREIGN KEY(bookmark_id) REFERENCES bookmarks(id) ON DELETE CASCADE,
      FOREIGN KEY(collection_id) REFERENCES collections(id) ON DELETE CASCADE,
      PRIMARY KEY (bookmark_id, collection_id)
    );
  `;

  db.serialize(() => {
    db.run(createBookmarksTable);
    db.run(createTagsTable);
    db.run(createBookmarkTagsTable);
    db.run(createCollectionsTable);
    db.run(createBookmarkCollectionsTable, (err) => {
      if (err) {
        console.error("Error creating tables", err.message);
      } else {
        console.log("Tables created or already exist.");
      }
    });
  });
};

module.exports = db;
