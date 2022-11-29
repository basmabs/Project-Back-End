const nodemailer = require('nodemailer')
const ejs = require('ejs')
const fs = require('fs');
exports.createSendMail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.message
    });
    res.send({ message: 'email send' })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || 'Error server' })
  }
};