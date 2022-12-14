const Company = require('../Models/Company_Auth_Model');
const Token = require('../Models/Token_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const fs = require('fs');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
/**
 * Register For Users Instruction 
 */
exports.Register = async (req, res) => {
  try {
    const find = await Company.findOne({ email: req.body.email })
    console.log(req.body);
    if (find) {
      res.status(400).send({ message: `Email already exists` })
    }
    else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      const USER = await Company.create(req.body)
      res.status(201).send(USER)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || `Server error` })
  }
};
/**
 * Login With JWT 
 */
exports.Login = async (req, res) => {
  try {
    const find = await Company.findOne({ email: req.body.email })
    if (find) {
      const passwordValid = await bcrypt.compare(req.body.password, find.password);
      if (passwordValid) {
        const data = {
          EMAIL: find.email,
          ID_COMPANY: find._id
        }
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.send({ message: 'Welcome to your dashboard', token: token })
      } else {
        res.status(400).send({ message: `Verify email or password` })
      }
    } else {
      res.status(400).send({ message: `Verify email or password` })
    }
  } catch (error) {
    res.status(500).send({ message: error.message || `Server error` })
  }
};
/**
 * Forgot Password With Sending Email link  of Reset 
 *  */
exports.forgetPassword = async (req, res) => {
  try {//find= company info
    const find = await Company.findOne({ email: req.body.email })
    if (!find) {
      res.status(400).send({ message: `does not exist` })
    } else {
      //delete former code if exist ,and get a new one 
      const token = await Token.findOne({ companyId: find._id })
      if (token) {
        await token.deleteOne()
      }
      /**
       * Generate Token Of Reset password
       */
      const resetToken = randomstring.generate(15)//
      await Token.create({
        companyId: find._id,
        token: resetToken
      })
      const html = fs.readFileSync("template/token_template.html", "utf8");
      const link = `${process.env.URLDashboard}/reset-password/${resetToken}`
      const render = ejs.render(html, { name: find.companyName, link: link })
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
      })
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Your account code ",
        html: render
      })
      res.status(200).send({ message: `Email sent` })
    }
  } catch (error) {
    res.status(500).send({ message: error.message || `Server error` })
  }
};
/**
 * Reset Password with validation of Token
 */
exports.resetPassword = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token })
    if (token) {
      const creationDate = new Date(token.createdAt)
      const dateNow = new Date()
      const diff = Math.floor((dateNow - creationDate) / 1000)
      if (diff < 900) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await Company.findByIdAndUpdate(token.companyId, { password: hash }, { new: true })//token of forget password not connected
        await token.deleteOne();
        res.status(200).send({ message: `Reset success` })
      } else {
        res.status(400).send({ message: `Token expired` })
      }
    } else {
      res.status(400).send({ message: `Reset token invalid` })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || `Server error` })
  }
};

exports.logoutSession = async (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err)
    }
    res.json({message:'Disconnected successfully'})
  })
}