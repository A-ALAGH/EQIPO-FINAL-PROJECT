const TeamWorkEvent = require('../models/teamWorkEventModel');

module.exports.createTeamWorkEvent = async (req, res) => {
  console.log(req.body);
  const { date, heure, lieu, activité, nombre_places_disponibles } = req.body;
  try {
    const teamWorkEvent = await TeamWorkEvent.create({ date, heure, lieu, activité, organisateur:req.user.userId, nombre_places_disponibles });
    res.status(201).json(teamWorkEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.getTeamWorkEvent = async (req, res) => {
  try {
    const teamWorkEvents = await TeamWorkEvent.find().populate('organisateur');
    res.status(200).json(teamWorkEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getTeamWorkEventById = async (req, res) => {
  try {
    const teamWorkEvent = await TeamWorkEvent.findById(req.params.id);
    if (!teamWorkEvent) return res.status(404).json({ message: 'TeamWorkEvent not found' });
    res.status(200).json(teamWorkEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateTeamWorkEvent = async (req, res) => {
  try {
    const teamWorkEvent = await TeamWorkEvent.findByIdAndUpdate(req.params.id, req.body);
    if (!teamWorkEvent) return res.status(404).json({ message: 'TeamWorkEvent not found' });
    res.status(200).json(teamWorkEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteTeamWorkEvent = async (req, res) => {
  try {
    const teamWorkEvent = await TeamWorkEvent.findByIdAndDelete(req.params.id);
    if (!teamWorkEvent) return res.status(404).json({ message: 'TeamWorkEvent not found' });
    res.status(200).json({ message: 'TeamWorkEvent deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
