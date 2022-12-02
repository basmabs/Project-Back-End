const express = require('express');
const { Register, Login, forgetPassword, resetPassword, logoutSession } = require('../Controllers/Company_Auth_Controller');
router = express.Router();
router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', logoutSession);
router.post('/forgot-password',forgetPassword);
router.put('/reset-password/:token', resetPassword);
module.exports = router;