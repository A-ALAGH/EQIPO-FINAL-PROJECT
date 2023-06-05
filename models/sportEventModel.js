const mongoose = require('mongoose');
const Event = require('./eventModel');

// Modèle de SportEvent (dérivé de Event)
const SportEventSchema = new mongoose.Schema({
  activité: {
    type: String,
    default:'sport',
    required: true
  }
});

const SportEvent = Event.discriminator('SportEvent',SportEventSchema);

module.exports = SportEvent
