const express = require('express');
const router = express.Router();
const sportEventController = require('../controllers/sportEventController');
const authMiddleware = require ('../middleware/authmiddleware')

router.post('/createSportEvent', authMiddleware, sportEventController.createSportEvent);
router.get('/sportEvents', sportEventController.getSportEvent);
router.get('/sportEvent/:id', sportEventController.getSportEventById);
router.put('/sportEvent/:id', sportEventController.updateSportEvent);
router.delete('/sportEvent/:id', sportEventController.deleteSportEvent);

module.exports = router;
