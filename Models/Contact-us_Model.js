const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactUs = new Schema(
  {
    email: { type: String, required: [true, `Contactus email is required`] },
    subject: { type: String, required: [true, `Contactus subject is required`] },
    message: { type: String, required: [true, `Contactus message is required`] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports = mongoose.model('contactUs', ContactUs, 'contactUs');