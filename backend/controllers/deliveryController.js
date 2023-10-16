const Delivery = require('../models/deliveryModel'); // Import the Delivery model
const DeliveryAdviceNote = require('../models/deliveryAdviceNoteModel'); // Import the Delivery Advice Note model
const SupplyOrder = require('../models/supplyOrderModel');


exports.createDelivery = async (req, res) => {
  try {
    const {
      deliveredBy,
      item,
      contactNo,
      deliveryLocation,
      supplierOrderReference,
    } = req.body;

    const newDelivery = new Delivery({
    
      deliveredBy,
      item,
      contactNo,
      deliveryLocation,
      deliveryStatus: "pending"
    });
    const savedDelivery = await newDelivery.save();

    

    const totprice = savedDelivery.item.quantity * savedDelivery.item.agreedPrice;
    //const totprice = 1000

    const newDeliveryAdviceNote = new DeliveryAdviceNote({
      supplierOrderReference,
      deleveryid: savedDelivery._id,
      item,
      total: totprice,
      deliveryAdviceNoteStatus: "pending"
        
      });
  
    const savedDeliveryAdviceNote = await newDeliveryAdviceNote.save();

    res.status(201).json(savedDelivery );
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.getAllDeliverieNotes = async (req, res) => {
  try {
    const delivery = await DeliveryAdviceNote.find();
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching delivery notes' });
  }
};

exports.getAllDeliveries = async (req, res) => {
  try {
    const delivery = await Delivery.find();
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching delivery' });
  }
};

exports.updateDeliveriesStatus = async (req, res) => {
  try {
    const { deliveryANStatus } = req.body;

    const id = req.params.id;

    const updatedDeliverie = await DeliveryAdviceNote.findByIdAndUpdate(
      id,
      { deliveryAdviceNoteStatus: deliveryANStatus }, // Using the value from the request body
      { new: true } // To return the updated document
    );

    if (!updatedDeliverie) {
      return res.status(404).json({ message: 'Delivery advice note not found' });
    }
    // const updateddcount = await SupplyOrder.findByIdAndUpdate(
    //   supplierOR,
    //   { deliverCount: dcount +1 }, // Using the value from the request body
    //   { new: true } // To return the updated document
    // );


    return res.json({ message: 'Delivery advice note status updated successfully', updatedDeliverie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// {supplierOrderReference: supplierOR},