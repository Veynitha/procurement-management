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
      requiredDate: {
        type: String,
        required: true,
      },
      siteDetails: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        required: true,
      },
      items: {
        type: [itemSchema], // Embed itemSchema as a subdocument array
        required: true,
      },
}, {timestamps: false});

const PurchaseOrder = mongoose.model('purchaseorders', PurchaseOrderSchema);

module.exports = PurchaseOrder;