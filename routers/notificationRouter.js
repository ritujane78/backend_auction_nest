const express = require('express');
const { saveNotification,allNotifications } = require('../controllers/notificationController');
const router = express.Router();

router.post('/saveNotification', saveNotification);
router.get('/allNotifications', allNotifications);


module.exports = router;