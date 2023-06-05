const sportEventModel = require('../models/sportEventModel');

module.exports.createSportEvent = async (req, res) => {
    console.log(req.body);
    const { date, heure, lieu, type, activité, participations, organisateur, nombre_participants  } = req.body;
    try {
      const sportEvent = await sportEventModel.create({ date, heure, lieu, type, activité, participations, organisateur, nombre_participants  });
      res.status(201).json(sportEvent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

module.exports.getSportEvents = async (req, res) => {
 try {
 const events = await Event.find();
 res.status(200).json(events);
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
};

module.exports.getSportEventById = async (req, res) => {
 try {
 const sportEvent = await Event.findById(req.params.id);
 if (!sportEvent) return res.status(404).json({ message: 'Event not found' });
 res.status(200).json(sportEvent);
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
};

module.exports.updateSportEvent = async (req, res) => {
 try {
 const sportEvent = await Event.findByIdAndUpdate(req.params.id, req.body);
 if (!sportEvent) return res.status(404).json({ message: 'Event not found' });
 res.status(200).json(sportEvent);
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
};

module.exports.deleteSportEvent = async (req, res) => {
 try {
 const sportEvent = await Event.findByIdAndDelete(req.params.id);
 if (!sportEvent) return res.status(404).json({ message: 'Event not found' });
 res.status(200).json({ message: 'Event deleted successfully' });
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
};
