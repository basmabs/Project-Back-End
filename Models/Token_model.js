const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Token = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports = mongoose.model('token', Token, 'token');