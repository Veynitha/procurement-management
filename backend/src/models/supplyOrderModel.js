const mongoose = require('mongoose');

const SupplyOrderSchema = new mongoose.Schema({
    orderReference: {
        type: String,
        required: true,
        unique: true
    },
    purchaseOrderReference: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: String,
        required: true,    
    },
    deliveryAddress: {
        type: String,
        required: true,
      },
    companyDetails: {
        type: String,
        required: true,
    },
    items: [
        {
          name: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
}, {timestamps: false});

const SupplyOrder = mongoose.model('supplyorders', SupplyOrderSchema);

module.exports = SupplyOrder;