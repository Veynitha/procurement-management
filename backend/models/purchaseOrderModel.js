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

const PurchaseOrderSchema = new mongoose.Schema({
  requestReference: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  approvedBy: {
    type: String,
    required: false,
  },
  supplierName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  items: {
    type: [itemSchema], // Embed itemSchema as a subdocument array
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Halted','Placed'],
    required: true,
  }
}, {timestamps: false});

const PurchaseOrder = mongoose.model('purchaseorders', PurchaseOrderSchema);

module.exports = PurchaseOrder;