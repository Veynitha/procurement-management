const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    agreedPrice: {
      type: Number,
      required: true,
    },
  });

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
    },
    isGenerated: {
        type: Boolean,
        required: true,
        default: false
    },
    items: {
        type: [itemSchema],
        required: true,
    }
});

const Invoice = mongoose.model('invoices', invoiceSchema);

module.exports = Invoice;
