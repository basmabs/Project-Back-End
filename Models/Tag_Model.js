const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tag = new Schema(
  {
    title: { type: String, required: [true, `tag title is required`] },
    description: { type: String, required: [true, `tag description is required`] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports = mongoose.model('tag', Tag, 'tag');