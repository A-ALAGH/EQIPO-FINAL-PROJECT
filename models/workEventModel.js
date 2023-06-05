const mongoose = require('mongoose');
const Event = require('./eventModel');
const mongoose = require('mongoose');
const Event = require('./eventModel');


// Modèle de WorkEvent (dérivé de Event)
const workEventSchema = new mongoose.Schema({
  domaine: {
    type: String,
    required: true
  },
});

const WorkEvent = Event.discriminator('WorkEvent', workEventSchema);


module.exports = WorkEvent
