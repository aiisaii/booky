const express = require('express');
const router = express.Router();
const aiTagsController = require('../controllers/aiTagsController');

router.post('/suggest-tags', aiTagsController.suggestTags);

module.exports = router;
