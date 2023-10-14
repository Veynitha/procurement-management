const express = require('express');
const router = express.Router();
const {createSupplyOrder, getAllSupplyOrders, incrementDeliveryCount, addItemToSupplyOrder} = require('../controllers/supplyOrderController');

// Create a new supply order
router.post('/create-supply-orders', createSupplyOrder);

// Get a list of all supply orders
router.get('/get-supply-orders', getAllSupplyOrders);

// Increment delivery count when accepting a delivery
router.put('/increment-delivery-count', incrementDeliveryCount);

//Add item to supply order
router.put('/add-item-to-supply-order', addItemToSupplyOrder);

//Remove item from supply order
router.post('/remove-item-from-supply-order', addItemToSupplyOrder);


module.exports = router;