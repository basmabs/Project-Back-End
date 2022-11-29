const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Reservation = new Schema(
  {
    firstName: { type: String, required: [true, `firstName is required`] },
    lastName: { type: String, required: [true, `lastName subject is required`] },
    email: { type: String, required: [true, `email is required`] }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model('reservation', Reservation, 'reservation');