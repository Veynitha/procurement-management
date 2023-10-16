const Invoice = require('../models/invoiceModel');

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        console.log(req)
        const { InvoiceDate, DueAmount, OrderReference, POReference, items } = req.body;

        const newInvoice = Invoice({
            InvoiceDate,
            DueAmount, 
            OrderReference, 
            POReference,
            items
        });

        const invoice = Invoice(newInvoice);
        await invoice.save();
        res.status(201).json(invoice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


