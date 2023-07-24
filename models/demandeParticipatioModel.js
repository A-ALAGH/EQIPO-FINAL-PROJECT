const mongoose = require('mongoose');

const eventRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  messageToOrganizer: {
    type: String,
    default:'',

  }
}, { timestamps: true });

const EventRequest = mongoose.model('EventRequest', eventRequestSchema);

module.exports = EventRequest;
