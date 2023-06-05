const express = require('express');
const router = express.Router();
const sportEventController = require('../controllers/sportEventController');

router.post('/createSportEvent', sportEventController.createSportEvent);
router.get('/sportEvents', sportEventController.getSportEvents);
router.get('/sportEvent/:id', sportEventController.getSportEventById);
router.put('/sportEvent/:id', sportEventController.updateSportEvent);
router.delete('/sportEvent/:id', sportEventController.deleteSportEvent);

module.exports = router;
