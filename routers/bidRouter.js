const express = require('express');
const { saveBid, getUserBids, bidHistory } = require('../controllers/bidController');
const router = express.Router();

router.post('/saveBid', saveBid);
router.get('/user/:user_id/bids', getUserBids);
router.get('/bids/:id', bidHistory );

module.exports = router;