const express = require('express');
const passport = require('passport');
const { createSendMail } = require('../Controllers/Contact-Us')
const router = express.Router();

router.post('/createSendMail', passport.authenticate('bearer', { session: false }), createSendMail);
module.exports = router;