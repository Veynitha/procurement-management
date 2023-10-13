const express = require('express');
const router = express.Router();
const {createPurchaseOrder, getAllPurchaseOrders} = require('../controllers/purchaseOrderController');

// Create a new supply order
router.post('/create-purchase-orders', createPurchaseOrder);

// Get a list of all supply orders
router.get('/get-purchase-orders', getAllPurchaseOrders);

module.exports = router;