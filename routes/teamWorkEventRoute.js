const express = require('express');
const router = express.Router();
const teamWorkEventController = require('../controllers/teamWorkEventController');

// Créer un nouvel événement de travail d'équipe
router.post('/create', teamWorkEventController.createTeamWorkEvent);

// Obtenir tous les événements de travail d'équipe
router.get('/all', teamWorkEventController.getTeamWorkEvent);

// Obtenir un événement de travail d'équipe par son identifiant
router.get('/:id', teamWorkEventController.getTeamWorkEventById);

// Mettre à jour un événement de travail d'équipe existant
router.put('/update/:id', teamWorkEventController.updateTeamWorkEvent);

// Supprimer un événement de travail d'équipe existant
router.delete('/delete/:id', teamWorkEventController.deleteTeamWorkEvent);

module.exports = router;
