const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {
    const { requestId, name, supplierName, deliveryDate, address, items } = req.body;

    // Calculate total and status
    const total = items.reduce((acc, item) => acc + parseFloat(item.agreedPrice) * parseInt(item.quantity), 0);
    const status = total < 100000 ? 'approved' : 'pending';

    // Create a new request instance
    const request = new Request({
      requestId,
      name,
      supplierName,
      deliveryDate,
      address,
      items,
      total,
      status,
    });

    await request.save();
    res.status(201).json(request);
  } catch (error) {
    console.log("Error entering request", err);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
