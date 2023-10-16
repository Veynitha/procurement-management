const SupplyOrder = require('../models/supplyOrderModel');
const Invoice = require('../models/invoiceModel');

// Create a new supply order
exports.createSupplyOrder = async (req, res) => {
  try {
    const {
      purchaseOrderReference,
      createdAt,
      deliveryAddress,
      requiredDate,
      companyDetails,
      total,
      items,
    } = req.body;

    const itemCount = items.length;
    const deliverCount = 0;
    const orderStatus = 'pending';

    const newSupplyOrder = SupplyOrder({
      purchaseOrderReference,
      createdAt,
      deliveryAddress,
      requiredDate,
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
    res.status(200).json(supplyOrders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching supply orders' });
  }
};

exports.incrementDeliveryCount = async (req, res) => {
    try {
        const {id, deliverCount, itemCount} = req.body;
        const newSupplyOrder = await SupplyOrder.findByIdAndUpdate(id, {deliverCount: deliverCount + 1})

        if((newSupplyOrder.deliverCount+1) === itemCount) {
            const delivered = await SupplyOrder.findByIdAndUpdate(id, {orderStatus: 'delivered'});
            const newInvoice = { POReference:newSupplyOrder.purchaseOrderReference, OrderReference: newSupplyOrder.orderReference, DueAmount: newSupplyOrder.total, InvoiceDate: new Date() }
            const invoice = Invoice(newInvoice);
            const generated = await invoice.save();
            return res.json(generated);
        }
        return res.json(newSupplyOrder);

    } catch (error) {
      res.status(400).json({message: "Something went wrong"});
    }
};

exports.addItemToSupplyOrder = async (req, res) => {
    try {
        const {id, item, itemCount, total} = req.body;
        const newSupplyOrder = await SupplyOrder.findByIdAndUpdate(id, {
            $push: { items: item }, // Add the item to the items array
            $inc: { itemCount: 1 }, // Increment the itemCount field by 1
            $inc: { total: item.agreedPrice * item.quantity }, // Increment the total field
          },
          { new: true } 
          )// Return the updated document)
        console.log(newSupplyOrder)
        return res.status(200).json("Item Added Successfully");
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.removeItemFromSupplyOrder = async (req, res) => {
    try {
      const { id, itemIndex } = req.body;
      const supplyOrder = await SupplyOrder.findById(id);
  
      if (!supplyOrder) {
        return res.status(404).json({ error: 'Supply order not found' });
      }
  
      // Check if the itemIndex is valid
      if (itemIndex < 0 || itemIndex >= supplyOrder.items.length) {
        return res.status(400).json({ error: 'Invalid item index' });
      }
  
      // Remove the item at the specified index
      supplyOrder.items.splice(itemIndex, 1);
  
      // Update itemCount and total fields
      supplyOrder.itemCount -= 1;
      supplyOrder.total -= supplyOrder.items[itemIndex].agreedPrice * supplyOrder.items[itemIndex].quantity;
  
      // Save the updated supply order
      const updatedSupplyOrder = await supplyOrder.save().catch((err) => {console.log(err)});
  
      return res.json(updatedSupplyOrder);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.getSupplyOrderById = async (req, res) => {
    try {
      const supplyOrder = await SupplyOrder.findById(req.params.id);
      if (!supplyOrder) {
        return res.status(404).json({ error: 'Supply order not found' });
      }
      res.status(200).json(supplyOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  



