const Company_Auth_Model = require('../Models/Company_Auth_Model');
const Event = require('../Models/Events_Model');
exports.createEvent = async (req, res) => {
  try {
    let newTags = [];
    req.body.tags.map((tag) => { newTags.push(tag.value) })
    req.body.tags = newTags;
    const event = await Event.create(req.body);

    await Company_Auth_Model.findByIdAndUpdate(req.user._id, { $push: { events: event._id } }, { new: true })
    res.send({ message: 'event is created' })
  } catch (error) {
    res.status(500).send({ message: 'server error' })
  }
};
exports.getEvent = async (req, res) => {
  try {
    const events = await Event.find()
    res.send(events)
  } catch (error) {
    res.status(500).send({ message: error.message || `Server error` })
  }
};
exports.getEventbyid = async (req, res) => {
  try {
    const event = await Event.findById(req.params.idEvent).populate('tags')
    res.send(event)
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' })
  }
};
exports.updateEvent = async (req, res) => {
  try {
    let newTags = []
    req.body.tags.map((tag)=> {
      return newTags.push(tag.value)
    })
    req.body.tags= newTags
    await Event.findByIdAndUpdate(req.params.idEvent, req.body)
    res.send({ message: 'event is updated' })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || 'Server error' })
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.idEvent)
    res.send({ message: 'Event is deleted' })
  }
  catch (error) {
    res.status(500).send({ message: error.message || 'Server error' })
  }
};