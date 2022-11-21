const Event = require('../Models/Events_Model');
exports.createEvent = async (req, res) => {
  try {
    await Event.create(req.body)
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
    const event = await Event.findById(req.params.idEvent)
    if (event) {
      res.send(event)
    } else {
      res.status(400).send({ message: 'Event is not found' })
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Server error' })
  }
};
exports.updateEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.idEvent, req.body)
    res.send({ message: 'event is updated' })
  } catch (error) {
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