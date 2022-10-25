const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = new Schema(
  {
    companyName: { type: String, required: [true, 'name is required'] },
    companyDescription: { type: String, required: [true, 'description is required'] },
    email: { type: String, required: [true, 'email is required'] },
    password: { type: String, required: [true, 'password is required'] },
    role: { type: String, default: 'Admin' },
    photo: String,
    events: [{ type: Schema.Types.ObjectId, ref: 'event' }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports = mongoose.model('company', Company, 'company');