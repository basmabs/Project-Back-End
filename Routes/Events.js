const express = require('express');
const passport = require('passport');
const { getEventbyid, getEvent, createEvent, deleteEvent, updateEvent } = require('../Controllers/Events');
const router = express.Router();

router.post('/createEvent', passport.authenticate('bearer', { session: false }), createEvent);
router.get('/getEvent', passport.authenticate('bearer', { session: false }), getEvent);
router.get('/getEventbyid/:idEvent', passport.authenticate('bearer', { session: false }), getEventbyid);
router.put('/updateEvent/:idEvent', passport.authenticate('bearer', { session: false }), updateEvent);
router.delete('/deleteEvent/:idEvent', passport.authenticate('bearer', { session: false }), deleteEvent);

module.exports = router;