const SupplyOrder = require('../models/supplyOrderModel');

// Create a new supply order
exports.createSupplyOrder = async (req, res) => {
  try {
    const {
      orderReference,
      purchaseOrderReference,
      createdAt,
      deliveryAddress,
      companyDetails,
      total,
      items,
    } = req.body;

    const itemCount = items.length;
    const deliverCount = 0;
    const orderStatus = 'pending';

    const newSupplyOrder = SupplyOrder({
      orderReference,
      purchaseOrderReference,
      createdAt,
      deliveryAddress,
      companyDetails,
      itemCount,
      deliverCount,
      orderStatus,
      total,
      items
    });

    const savedSupplyOrder = await newSupplyOrder.save();
    res.status(201).json(savedSupplyOrder);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
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