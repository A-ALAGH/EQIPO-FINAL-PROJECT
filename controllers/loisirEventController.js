const loisirEventModel = require('../models/loisirEventModel');

module.exports.createLoisirEvent = async (req, res) => {
  console.log(req.body);
  const { date, heure, lieu, type, activité, participations, organisateur, nombre_participants } = req.body;
  try {
    const loisirEvent = await loisirEventModel.create({ date, heure, lieu, type, activité, participations, organisateur, nombre_participants });
    res.status(201).json(loisirEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports.getLoisirEvents = async (req, res) => {
  try {
    const events = await loisirEventModel.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getLoisirEventById = async (req, res) => {
  try {
    const loisirEvent = await loisirEventModel.findById(req.params.id);
    if (!loisirEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(loisirEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateLoisirEvent = async (req, res) => {
  try {
    const loisirEvent = await loisirEventModel.findByIdAndUpdate(req.params.id, req.body);
    if (!loisirEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(loisirEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteLoisirEvent = async (req, res) => {
  try {
    const loisirEvent = await loisirEventModel.findByIdAndDelete(req.params.id);
    if (!loisirEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

