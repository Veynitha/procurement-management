const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
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

const requestSchema = new Schema({
  requestId: {
    type: String,
    required: true,
  },
  name: {
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
  address: {
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
    enum: ['approved', 'pending','reject', 'placed'],
    required: true,
  }
});

const RequestModel = mongoose.model("Request", requestSchema);

module.exports = {RequestModel};