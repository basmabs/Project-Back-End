const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = new Schema(
  {
    eventName: { type: String, required: [true, `Event name is required`] },
    eventDescription: { type: String, required: [true, `Event description is required`] },
    photo: { type: String, default: 'https://imgur.com/e5PnZbW.png' },
    eventDate: { type: String, required: [true, `Event date is required`] },
    eventTime: { type: String, required: [`Event time is required`] },
    eventType: { type: String, required: ['paid', `Event type is required`] },
    price: { type: Number, required: [true, 'Event price is required'] },
    location: { type: String, required: [true, 'Event location is required'] },
    ticketNumber: { type: Number, required: [true, 'Event ticket number is required'] },
    photo: String,
    events: [{ type: Schema.Types.ObjectId, ref: 'event' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports = mongoose.model('event', Event, 'event');