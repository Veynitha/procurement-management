const mongoose = require("mongoose");

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

const deliveryAdviceNoteSchema = new mongoose.Schema({
  supplierOrderReference: {
    type: String,
    required: true,
  },
  deleveryid: {
    type: String,
    required: true,
    unique: true,
  },
  item: {
    type: itemSchema, // Assuming items are represented as an array of strings
    // required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  deliveryAdviceNoteStatus: {
    type: String,
    required: true,
  },
});

const DeliveryAdviceNote = mongoose.model("deliveryAdviceNote", deliveryAdviceNoteSchema);

module.exports = DeliveryAdviceNote;
