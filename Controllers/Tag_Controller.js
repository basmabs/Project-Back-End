const Tag = require('../Models/Tag_Model');
exports.createTag = async (req, res) => {
  try {
    await Tag.create(req.body)
    res.status(201).send({ message: `Tag is created` })
  } catch (error) {
    res.status(500).send({ message: error.message || `Server error` })
  }
};
exports.getTag = async (req, res) => {
  try {
    const tag = await Tag.find()
    res.send(tag)
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.getTagbyid = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.idTag)
    if (tag) {
      res.send(tag)
    } else {
      res.status(400).send({ message: error.message || `tag is not found` })
    }
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.updateTag = async (req, res) => {
  try {
    await Tag.findByIdAndUpdate(req.params.idTag, req.body)
    res.send({ message: `tag is updated` })
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.deleteTag = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.idTag)
    res.send({ message: `tag is deletetd` })
  } catch (error) {
    res.status(500).send({ message: error.message || `server error` })
  }
};
exports.getTagsForEvents = async (req, res) => {
  try {
    const tag = await Tag.find()
    let newTags = [];
    tag.map((t) => {
      newTags.push({
        label: t.title, value: t._id
      })
    })
    res.send(newTags)
  } catch (error) {
    res.status(500).send({ message: error.message || 'server error' })
  }
};