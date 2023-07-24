const SportEvent = require('../models/sportEventModel');

module.exports.createSportEvent = async (req, res) => {
  console.log(req.user);
  const { date, heure,lieu, activité, nombre_places_disponibles } = req.body;
  try {
    const sportEvent = await SportEvent.create({ date, heure,lieu, activité, organisateur:req.user.userId, nombre_places_disponibles });
    res.status(201).json(sportEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.getSportEvent = async (req, res) => {
  try {
    const sportEvents = await SportEvent.find().populate('organisateur');
    res.status(200).json(sportEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getSportEventById = async (req, res) => {
  try {
    const sportEvent = await SportEvent.findById(req.params.id);
    if (!sportEvent) return res.status(404).json({ message: 'SportEvent not found' });
    res.status(200).json(sportEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateSportEvent = async (req, res) => {
  try {
    const sportEvent = await SportEvent.findByIdAndUpdate(req.params.id, req.body);
    if (!sportEvent) return res.status(404).json({ message: 'SportEvent not found' });
    res.status(200).json(sportEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteSportEvent = async (req, res) => {
  try {
    const sportEvent = await SportEvent.findByIdAndDelete(req.params.id);
    if (!sportEvent) return res.status(404).json({ message: 'SportEvent not found' });
    res.status(200).json({ message: 'SportEvent deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
