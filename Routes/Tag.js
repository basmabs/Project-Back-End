const express = require('express');
const passport = require('passport');
const { createTag, getTagbyid, deleteTag, updateTag, getTag, getTagsForEvents } = require('../Controllers/Tag_Controller');
const router = express.Router();
router.post('/createTag', passport.authenticate('bearer', { session: false }), createTag);
router.get('/getTag', passport.authenticate('bearer', { session: false }), getTag);
router.get('/getTagbyid/:idTag', passport.authenticate('bearer', { session: false }), getTagbyid);
router.get('/getTagsForEvents', passport.authenticate('bearer', { session: false }), getTagsForEvents)
router.put('/updateTag/:idTag', passport.authenticate('bearer', { session: false }), updateTag);
router.delete('/deleteTag/:idTag', passport.authenticate('bearer', { session: false }), deleteTag);
module.exports = router;