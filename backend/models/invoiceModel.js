const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    POReference: {
        type: String,
        required: true
    },
    OrderReference: {
        type: String,
        required: true
    },
    DueAmount: {
        type: Number,
        required: true
    },
    InvoiceDate: {
        type: Date,
        required: true
    }
});

const Invoice = mongoose.model('invoices', invoiceSchema);

module.exports = Invoice;
