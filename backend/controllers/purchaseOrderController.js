const PurchaseOrder = require('../models/purchaseOrderModel');
// Create a new supply order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const {
      requestReference,
      createdBy,
      approvedBy,
      supplierName,
      companyName,
      deliveryDate,
      deliveryAddress,
      total,
      items,
      status
    } = req.body;

    const status = 'Placed';

    const newPurchaseOrder = PurchaseOrder({
      requestReference,
      createdBy,
      approvedBy,
      supplierName,
      companyName,
      deliveryDate,
      deliveryAddress,
      total,
      items,
      status
    });

    const savedPurchaseOrder = await newPurchaseOrder.save();
    res.status(201).json(savedPurchaseOrder);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};

// Get a list of all supply orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching supply orders' });
  }
};
