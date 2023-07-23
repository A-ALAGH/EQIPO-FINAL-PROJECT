const mongoose = require('mongoose');
const Event = require('./eventModel');

const teamWorkEventSchema = new mongoose.Schema({
  activité: {
    type: String,
    default: 'teamwork', 
    required: true
  }
});

const TeamWorkEvent = Event.discriminator('TeamWorkEvent', teamWorkEventSchema);

module.exports = TeamWorkEvent;
