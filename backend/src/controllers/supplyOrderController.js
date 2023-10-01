const {} = require('../models/supplyOrderModel');

// Create a new supply order
exports.createSupplyOrder = async (req, res) => {
  try {
    const {
      orderReference,
      purchaseOrderReference,
      createdAt,
      deliveryAddress,
      companyDetails,
      items,
    } = req.body;

    const newSupplyOrder = new SupplyOrder({
      orderReference,
      purchaseOrderReference,
      createdAt,
      deliveryAddress,
      companyDetails,
      items,
    });

    const savedSupplyOrder = await newSupplyOrder.save();
    res.status(201).json(savedSupplyOrder);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new supply order' });
  }
};

// Get a list of all supply orders
exports.getAllSupplyOrders = async (req, res) => {
  try {
    const supplyOrders = await SupplyOrder.find();
    res.json(supplyOrders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching supply orders' });
  }
};