const db = require('../config/db');

// Get all bookmarks, optionally filtered by type
exports.getAllBookmarks = (req, res) => {
  const { type } = req.query;
  let sql = 'SELECT * FROM bookmarks';
  const params = [];

  if (type) {
    sql += ' WHERE type = ?';
    params.push(type);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parse JSON data for each bookmark
    const bookmarks = rows.map(row => ({
      ...row,
      standard_data: row.standard_data ? JSON.parse(row.standard_data) : null,
      people_data: row.people_data ? JSON.parse(row.people_data) : null,
      torrent_data: row.torrent_data ? JSON.parse(row.torrent_data) : null,
    }));
    res.json({ data: bookmarks });
  });
};

// Get a single bookmark by ID
exports.getBookmarkById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM bookmarks WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            const bookmark = {
                ...row,
                standard_data: row.standard_data ? JSON.parse(row.standard_data) : null,
                people_data: row.people_data ? JSON.parse(row.people_data) : null,
                torrent_data: row.torrent_data ? JSON.parse(row.torrent_data) : null,
            };
            res.json({ data: bookmark });
        } else {
            res.status(404).json({ message: 'Bookmark not found' });
        }
    });
};

// Create a new bookmark
exports.createBookmark = (req, res) => {
  const { type, title, notes, preview_image, standard_data, people_data, torrent_data } = req.body;

  if (!type || !title) {
    return res.status(400).json({ error: 'Missing required fields: type, title' });
  }

  const sql = `
    INSERT INTO bookmarks (type, title, notes, preview_image, standard_data, people_data, torrent_data)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    type,
    title,
    notes || null,
    preview_image || null,
    standard_data ? JSON.stringify(standard_data) : null,
    people_data ? JSON.stringify(people_data) : null,
    torrent_data ? JSON.stringify(torrent_data) : null,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Bookmark created', data: { id: this.lastID } });
  });
};

// Update a bookmark
exports.updateBookmark = (req, res) => {
    const { id } = req.params;
    const { title, notes, preview_image, standard_data, people_data, torrent_data } = req.body;

    const sql = `
        UPDATE bookmarks
        SET title = ?, notes = ?, preview_image = ?, standard_data = ?, people_data = ?, torrent_data = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const params = [
        title,
        notes,
        preview_image,
        standard_data ? JSON.stringify(standard_data) : null,
        people_data ? JSON.stringify(people_data) : null,
        torrent_data ? JSON.stringify(torrent_data) : null,
        id
    ];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        res.json({ message: 'Bookmark updated', changes: this.changes });
    });
};

// Delete a bookmark
exports.deleteBookmark = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM bookmarks WHERE id = ?';
    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        res.json({ message: 'Bookmark deleted', changes: this.changes });
    });
};
