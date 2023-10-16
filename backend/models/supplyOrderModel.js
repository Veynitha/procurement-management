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

const SupplyOrderSchema = new mongoose.Schema({ 
    purchaseOrderReference: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,    
    },
    deliveryAddress: {
        type: String,
        required: true,
      },
    requiredDate: {
        type: Date,
        required: true,
    },
    companyDetails: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    itemCount: {
        type: Number,
        required: true,
    },
    deliverCount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
    items: {
        type: [itemSchema], // Embed itemSchema as a subdocument array
        required: true,
    },
}, {timestamps: false});

const SupplyOrder = mongoose.model('supplyorders', SupplyOrderSchema);

module.exports = SupplyOrder;