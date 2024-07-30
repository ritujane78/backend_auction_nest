const express = require('express');
const { signup, signin, getUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user/:user_id', getUser)

module.exports = router;
