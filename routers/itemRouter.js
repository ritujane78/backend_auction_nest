const express = require('express');
const { uploadItem, saveItem, getItems, updateFinalPrices } = require('../controllers/itemController');
const router = express.Router();

router.post('/upload', uploadItem, saveItem);
router.get('/items', getItems);
router.post('/updateFinalPrices', updateFinalPrices)

module.exports = router;
