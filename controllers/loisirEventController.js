const LoisirEvent = require('../models/loisirEventModel');

module.exports.createLoisirEvent = async (req, res) => {
  console.log(req.body);
  const { date, heure,lieu, activité, participations, organisateur, nombre_places } = req.body;
  try {
    const loisirEvent = await LoisirEvent.create({ date, heure,lieu, activité, participations, organisateur, nombre_places });
    res.status(201).json(loisirEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports.getLoisirEvents = async (req, res) => {
  try {
    const events = await LoisirEvent.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getLoisirEventById = async (req, res) => {
  try {
    const loisirEvent = await LoisirEvent.findById(req.params.id);
    if (!loisirEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(loisirEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateLoisirEvent = async (req, res) => {
  try {
    const loisirEvent = await LoisirEvent.findByIdAndUpdate(req.params.id, req.body);
    if (!loisirEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(loisirEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteLoisirEvent = async (req, res) => {
  try {
    const loisirEvent = await LoisirEvent.findByIdAndDelete(req.params.id);
    if (!loisirEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

