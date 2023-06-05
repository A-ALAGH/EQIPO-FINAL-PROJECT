const mongoose = require('mongoose');
const Event = require('./eventModel');

// Modèle de LoisirEvent (dérivé de Event)
const loisirEventSchema = new mongoose.Schema({
    activité: {
      type: String,
      default: 'loisir',
      required: true
    }
  });

const LoisirEvent = Event.discriminator('LoisirEvent', loisirEventSchema);

module.exports = LoisirEvent ;
