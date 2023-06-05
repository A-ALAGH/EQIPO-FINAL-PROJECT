const express = require('express');
const router = express.Router();
const demandeCtrl = require('../controllers/demandeController');

// Route pour créer une demande de participation
router.post('/', demandeCtrl.createEventRequest);

// Route pour obtenir une demande de participation par son identifiant
router.get('/:id', demandeCtrl.getEventRequestById);

// Route pour mettre à jour une demande de participation
router.put('/:id', demandeCtrl.updateEventRequest);

// Route pour supprimer une demande de participation
router.delete('/:id', demandeCtrl.deleteEventRequest);

// Route pour obtenir toutes les demandes de participation
router.get('/', demandeCtrl.getAllEventRequests);

//Route pour accepter une participation
router.put('/:id/accept', demandeCtrl.acceptEventRequest);

// Route pour refuser une demande de participation
router.put('/:id/refuse', demandeCtrl.refuseEventRequest);

module.exports = router;
