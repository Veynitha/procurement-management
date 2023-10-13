const express = require('express');
const router = express.Router();
const {createSupplyOrder, getAllSupplyOrders} = require('../controllers/supplyOrderController');

// Create a new supply order
router.post('/create-supply-orders', createSupplyOrder);

// Get a list of all supply orders
router.get('/get-supply-orders', getAllSupplyOrders);

module.exports = router;