const express = require('express');
const router = express.Router();
const bookmarksController = require('../controllers/bookmarksController');

// GET /api/bookmarks - Get all bookmarks
router.get('/', bookmarksController.getAllBookmarks);

// GET /api/bookmarks/:id - Get a single bookmark by ID
router.get('/:id', bookmarksController.getBookmarkById);

// POST /api/bookmarks - Create a new bookmark
router.post('/', bookmarksController.createBookmark);

// PUT /api/bookmarks/:id - Update a bookmark
router.put('/:id', bookmarksController.updateBookmark);

// DELETE /api/bookmarks/:id - Delete a bookmark
router.delete('/:id', bookmarksController.deleteBookmark);

module.exports = router;
