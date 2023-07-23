const express = require('express');
const router = express.Router();
const sportEventController = require('../controllers/sportEventController');
const authMiddleware = require ('../middleware/authmiddleware')

router.post('/create', authMiddleware, sportEventController.createSportEvent);
router.get('/all', sportEventController.getSportEvent);
router.get('/:id', sportEventController.getSportEventById);
router.put('/update/:id', sportEventController.updateSportEvent);
router.delete('/delete/:id', sportEventController.deleteSportEvent);

module.exports = router;
