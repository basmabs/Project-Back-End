const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = new Schema(
  {
    companyName: { type: String, required: [true, 'Company name is required'] },
    companyDescription: { type: String, required: [true, 'Company description is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    role: { type: String, default: 'Admin' },
    photo: { type: String, default: 'https://imgur.com/e5PnZbW.png' },
    events: [{ type: Schema.Types.ObjectId, ref: 'event' }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports = mongoose.model('company', Company, 'company');