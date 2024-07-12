const express = require('express');
const { uploadItem, saveItem, getItems } = require('../controllers/itemController');
const router = express.Router();

router.post('/upload', uploadItem, saveItem);
router.get('/items', getItems);

module.exports = router;
