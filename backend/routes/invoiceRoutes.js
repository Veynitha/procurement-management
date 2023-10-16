const express = require('express');
const router = express.Router();
const {createInvoice, getInvoiceById, getInvoices} = require('../controllers/invoicesController');

// Create a new invoice
router.post('/create-invoice', createInvoice);

// Get all purchase orders
router.get('/get-invoices', getInvoices);

// Get a single Invoice by id
router.get('/get-invoice/:id', getInvoiceById);

module.exports = router;