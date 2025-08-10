const express = require('express');
const router = express.Router();
const raindropController = require('../controllers/raindropController');

router.post('/sync', raindropController.syncRaindrops);

module.exports = router;
