const express = require('express');
const { createTag, getTagbyid, deleteTag, updateTag, getTag } = require('../Controllers/Tag_Controller');
const router = express.Router();
router.post('/createTag', createTag);
router.get('/getTag', getTag);
router.get('/getTagbyid/:idTag', getTagbyid);
router.put('/updateTag/:idTag', updateTag);
router.delete('/deleteTag/:idTag', deleteTag);
module.exports = router;