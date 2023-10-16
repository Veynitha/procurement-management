const express = require('express');
const router = express.Router();
const {createDelivery, getAllDeliverieNotes, getAllDeliveries, updateDeliveriesStatus} = require('../controllers/deliveryController');

// Create a new supply order
router.post('/delivery', createDelivery);
router.get('/alldeliveries', getAllDeliveries);
router.get('/alldeliverynotes', getAllDeliverieNotes);
router.put('/updateDilivery/:id', updateDeliveriesStatus);


module.exports = router;