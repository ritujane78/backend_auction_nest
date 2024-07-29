const express = require('express');
const { getUser, getUserBids } = require('../controllers/profileController');
const router = express.Router();

router.get('/user/:user_id', getUser);
router.get('/user/:user_id/bids', getUserBids);

module.exports = router;
