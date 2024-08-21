const express = require('express');
const {sendMail} = require('../controllers/emailController');
const router = express.Router();

router.post('/sendEmail', sendMail);


module.exports = router;