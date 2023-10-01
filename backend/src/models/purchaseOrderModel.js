const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
      purchaseOrderReference: {
        type: String,
        required: true,
        unique: true,
      },  
      companyDetails: {
        type: String,
        required: true,
      },
      supplierDetails: {
        type: String,
        required: true,
      },
      deliveryAddress: {
        type: String,
        required: true,
      },
      requestReference: {
        type: String,
        required: true,
        unique: true
      },
      requiredDate: {
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

const PurchaseOrder = mongoose.model('purchaseorders', PurchaseOrderSchema);

module.exports = PurchaseOrder;