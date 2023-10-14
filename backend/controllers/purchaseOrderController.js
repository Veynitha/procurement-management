const PurchaseOrder = require('../models/purchaseOrderModel');
// Create a new supply order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const {
      purchaseOrderReference,
      requestReference,
      companyDetails,
      supplierDetails,
      createdAt,
      deliveryAddress,
      requiredDate,
      siteDetails,
      total,
      items,
    } = req.body;

    const newPurchaseOrder = PurchaseOrder({
        purchaseOrderReference,
        requestReference,
        companyDetails,
        supplierDetails,
        createdAt,
        deliveryAddress,
        requiredDate,
        siteDetails,
        total,
        items,
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
