const {RequestModel} = require('../models/Request');

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
    console.log("Error entering request", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await RequestModel.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateRequestStatus = async (req, res) => {
  try {
    const { newStatus } = req.body; 

    const id = req.params.id; 

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.json({ message: 'Request status updated successfully', updatedRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


 exports.getRequest =async (req, res) => {
  const { id } = req.params;

  try {
    const request = await RequestModel.findById({_id:id });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


