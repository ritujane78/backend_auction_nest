const express = require('express');
const { getUser, getUserBids, getUserWins, getUploads } = require('../controllers/profileController');
const router = express.Router();

router.get('/user/:user_id', getUser);
router.get('/user/:user_id/uploads', getUploads); 
router.get('/user/:user_id/bids', getUserBids); // New route for user bids
router.get('/user/:user_id/wins', getUserWins);

module.exports = router;
