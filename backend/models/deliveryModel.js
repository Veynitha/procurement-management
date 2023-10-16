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

const deliverySchema = new mongoose.Schema({
    deliveredBy: {
        type: String,
        required: true
    },
    item: {
        type: itemSchema, // Assuming items are represented as an array of strings
        // required: true
    },
    contactNo :{
      type: String, 
    },
    deliveryLocation: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        required: true
    }
});

const Delivery = mongoose.model('delivery', deliverySchema);

module.exports = Delivery;
