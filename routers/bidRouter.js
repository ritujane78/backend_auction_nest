const express = require('express');
const { saveBid } = require('../controllers/bidController');
const router = express.Router();

router.post('/saveBid', saveBid);

module.exports = router;