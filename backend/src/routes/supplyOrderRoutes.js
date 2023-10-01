const express = require('express');
const router = express.Router();
const supplyOrderController = require('../controllers/supplyOrderController');

// Create a new supply order
router.post('/supply-orders', supplyOrderController.createSupplyOrder);

// Get a list of all supply orders
router.get('/supply-orders', supplyOrderController.getAllSupplyOrders);

module.exports = router;