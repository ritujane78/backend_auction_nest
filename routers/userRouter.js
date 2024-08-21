const express = require('express');
const { signup, signin, getUser, userEmail } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user/:user_id', getUser)
router.get('/userEmail/:user_id', userEmail)

module.exports = router;
