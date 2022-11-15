const express = require('express');
// const passport = require('passport');
const { createCompany, getCompany, getCompanybyid, deleteCompany, updateCompany } = require('../Controllers/CompanyAPI');
const router = express.Router();
router.post('/createCompany', createCompany);
router.get('/getCompany',getCompany);
router.get('/getCompanybyid/:idCompany', getCompanybyid);
router.put('/updateCompany/:idCompany', updateCompany);
router.delete('/deleteCompany/:idCompany', deleteCompany);
module.exports = router;
// passport.authenticate('bearer', { session: false }),