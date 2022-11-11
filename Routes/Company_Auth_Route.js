const express = require('express');
const passport = require('passport');
const { Register, Login, forgetPassword, resetPassword } = require('../Controllers/Company_Auth_Controller');
router = express.Router();
router.post('/register', Register);
router.post('/login', Login);
router.post('/forgot-password', passport.authenticate('bearer', { session: false }), forgetPassword);
router.put('/reset-password/:token', passport.authenticate('bearer', { session: false }), resetPassword);
module.exports = router;