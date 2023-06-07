const EventRequest = require('../models/demandeParticipatioModel');
const Event = require('../models/eventModel');
const user = require ('../models/userModel')

// Créer une demande de participation à un événement
exports.createEventRequest = (req, res, next) => {
  const { user, event, status, messageToOrganizer } = req.body;

  const eventRequest = new EventRequest({
    user,
    event,
    status,
    messageToOrganizer
  });

  eventRequest.save()
    .then(() => res.status(201).json({ message: 'Demande de participation créée !' }))
    .catch(error => res.status(400).json({ error }));
};

// Obtenir une demande de participation par son identifiant
exports.getEventRequestById = (req, res, next) => {
  EventRequest.findById(req.params.id)
    .populate('user')
    .populate('Event')
    .then(eventRequest => {
      if (!eventRequest) {
        return res.status(404).json({ error: 'Demande de participation non trouvée !' });
      }
      res.status(200).json(eventRequest);
    })
    .catch(error => res.status(500).json({ error }));
};

// Mettre à jour une demande de participation
exports.updateEventRequest = (req, res, next) => {
  const { user, event, status, messageToOrganizer } = req.body;

  EventRequest.findByIdAndUpdate(req.params.id, {
    user,
    event,
    status,
    messageToOrganizer
  })
    .then(() => res.status(200).json({ message: 'Demande de participation modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer une demande de participation
exports.deleteEventRequest = (req, res, next) => {
  EventRequest.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Demande de participation supprimée !' }))
    .catch(error => res.status(400).json({ error }));
};

// Obtenir toutes les demandes de participation
exports.getAllEventRequests = (req, res, next) => {
  EventRequest.find()
    .populate('user')
    .populate('event')
    .then(eventRequests => res.status(200).json(eventRequests))
    .catch(error => res.status(400).json({ error }));
};

//accepter une participation
exports.acceptEventRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;

    // Mettre à jour le statut de la demande de participation
    await EventRequest.findByIdAndUpdate(requestId, { status: 'accepted' });

    // Récupérer l'événement correspondant à la demande de participation
    const event = await Event.findById(req.body.event);

    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    // Vérifier s'il reste des places disponibles
    if (event.nombre_places_disponibles <= 0) {
      return res.status(400).json({ error: 'Plus de places disponibles' });
    }

    // Mettre à jour le nombre de places disponibles
    event.nombre_places_disponibles -= 1;

    // Ajouter le demandeur à l'array participations de l'événement
    event.participations.push(req.body.user);

    await event.save();

    res.status(200).json({ message: 'Demande de participation acceptée !' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
  
  
  // Refuser une demande de participation
exports.refuseEventRequest = (req, res, next) => {
    const requestId = req.params.id;
  
    // Mettre à jour le statut de la demande de participation
    EventRequest.findByIdAndUpdate(requestId, { status: 'refused' })
      .then(() => {
        res.status(200).json({ message: 'Demande de participation refusée !' });
      })
      .catch(error => res.status(400).json({ error }));
  };

  