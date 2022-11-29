const express = require('express');
const passport = require('passport');
const { createReservation } = require('../Controllers/Reservation');
const router = express.Router();

router.post('/createReservation/:id', passport.authenticate('bearer', { session: false }), createReservation);

module.exports = router;