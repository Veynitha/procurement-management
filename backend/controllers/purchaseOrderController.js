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
    } = req.body;

    const status = 'placed';

    const newPurchaseOrder = PurchaseOrder({
      requestReference,
      createdBy,
      approvedBy,
      supplierName,
      companyName,
      deliveryDate,
      deliveryAddress,
      items,
      total,
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

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching purchase order' });
  }
}

exports.acceptPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    purchaseOrder.status = 'accepted';
    purchaseOrder.save();
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while accepting purchase order' });
  }
}

exports.rejectPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    purchaseOrder.status = 'rejected';
    purchaseOrder.save();
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while rejecting purchase order' });
  }
}


