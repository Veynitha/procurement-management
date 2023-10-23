const express = require('express');
const router = express.Router();
const {createPurchaseOrder, getAllPurchaseOrders, acceptPurchaseOrder, getPurchaseOrderById, rejectPurchaseOrder} = require('../controllers/purchaseOrderController');

// Create a new supply order
router.post('/create-purchase-orders', createPurchaseOrder);

// Get a list of all supply orders
router.get('/get-purchase-orders', getAllPurchaseOrders);

// Accept purchase order by id
router.put('/accept-purchase-order/:id', acceptPurchaseOrder);

// Reject purchase order by id
router.put('/reject-purchase-order/:id', rejectPurchaseOrder);

// Get purchase order by id
router.get('/get-purchase-order/:id', getPurchaseOrderById)

module.exports = router;