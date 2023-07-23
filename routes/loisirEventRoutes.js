const express = require('express');
const router = express.Router();
const loisirEventController = require('../controllers/loisirEventController');

router.post('/create', loisirEventController.createLoisirEvent);
router.get('/all', loisirEventController.getLoisirEvents);
router.get('/:id', loisirEventController.getLoisirEventById);
router.put('/update/:id', loisirEventController.updateLoisirEvent);
router.delete('/delete/:id', loisirEventController.deleteLoisirEvent);

module.exports = router;
