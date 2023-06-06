const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  heure: {
    type: String,
    required: true
  },
  lieu: {
    type: String,
    required: true
  },
  participations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  organisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  nombre_places_disponibles: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
