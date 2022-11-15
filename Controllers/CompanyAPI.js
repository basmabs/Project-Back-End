const Company = require('../Models/Company_Auth_Model');
const bcrypt = require('bcryptjs');
exports.createCompany = async (req, res) => {
  try {
    const found = await Company.findOne({ email: req.body.email })
    if (found) {
      res.status(400).send({ message: `Email already exists` });
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = await bcrypt.hashSync(req.body.password, salt)
      req.body.password = hash
      await Company.create(req.body)
      res.status(201).send({ message: 'Company is created' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || 'Server error' });
  }
};
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.find()
    res.send(company)
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' })
  }
};
exports.getCompanybyid = async (req, res) => {
  try {
    const company = await Company.findById(req.params.idCompany)
    if (company) {
      res.send(company)
    } else {
      res.status(400).send({ message: 'Company not found' })
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' })
  }
};
exports.updateCompany = async (req, res) => {
  try {
    await Company.findByIdAndUpdate(req.params.idCompany, req.body)
    res.send({ message: 'Company is updated' })
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' })
  }
};
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.idCompany)
    res.send({ message: 'Company is deleted' })
  }
  catch (error) {
    res.status(500).send({ message: error.message || 'Server error' })
  }
};