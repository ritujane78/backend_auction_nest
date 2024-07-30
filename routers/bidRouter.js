const express = require('express');
const { saveBid, getUserBids } = require('../controllers/bidController');
const router = express.Router();

router.post('/saveBid', saveBid);
router.get('/user/:user_id/bids', getUserBids);

module.exports = router;