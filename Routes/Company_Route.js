const express = require('express');
// const passport = require('passport');
const { Register, Login, forgetPassword, resetPassword } = require('../Controllers/Company_Controllers');

router = express.Router();
router.post('/register', Register);
router.post('/login', Login);
router.post('/forgot-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;