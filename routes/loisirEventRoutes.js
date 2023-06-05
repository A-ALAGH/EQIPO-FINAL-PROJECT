const express = require('express');
const router = express.Router();
const loisirEventController = require('../controllers/loisirEventController');

router.post('/createloisirEvent', loisirEventController.createLoisirEvent);
router.get('/loisirEvents', loisirEventController.getLoisirEvents);
router.get('/loisirEvent/:id', loisirEventController.getLoisirEventById);
router.put('/loisirEvent/:id', loisirEventController.updateLoisirEvent);
router.delete('/loisirEvent/:id', loisirEventController.deleteLoisirEvent);

module.exports = router;
