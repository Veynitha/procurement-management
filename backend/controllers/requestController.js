const {RequestModel} = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {

    const { requestId, name, supplierName, deliveryDate,  address, items, companyName, } = req.body;

    // Calculate total and status
    let total = 0;

    if (req.body.items && req.body.items.length > 0) {
      total = req.body.items.reduce((acc, item) => {
        return acc + parseFloat(item.agreedPrice) * parseInt(item.quantity);
      }, 0);
    }

    const status = total < 100000 ? 'approved' : 'pending';
    const approvedBy = total < 100000 ? 'name' : '';

    // Create a new request instance
    const request = new RequestModel({
      requestId,
      name,
      approvedBy,
      supplierName,
      companyName,
      deliveryDate,
      address,
      items,
      total,
      status,
    });

    const gg = await request.save();
    console.log(gg)

    res.status(201).json(request);
  } catch (error) {
    //console.log("Error entering request", error);
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
}

exports.updateRequestStatus = async (req, res) => {
  try {
    const { newStatus , approvedBy} = req.body; 

    const id = req.params.id; 

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { approvedBy: approvedBy},
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




exports.deleteRequest = async (req, res) => {
  const requestId = req.params.id; // Extract request ID from URL params

  try {
    // Find the request by ID and delete it
    const deletedRequest = await RequestModel.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      // If request with the given ID is not found, send a 404 response
      return res.status(404).json({ error: 'Request not found' });
    }

    // Request deleted successfully, send a success response
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    // Handle errors, send a 500 response with the error message
    console.error('Error deleting request', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.updateRequest = async (req, res) => {
  const requestId = req.params.id; // Extract request ID from URL params
  const updateData = req.body; // Extract update data from request body

  try {
    // Find the request by ID and update it
    const updatedRequest = await RequestModel.findByIdAndUpdate(requestId, updateData, { new: true });

    if (!updatedRequest) {
      // If request with the given ID is not found, send a 404 response
      return res.status(404).json({ error: 'Request not found' });
    }

    // Recalculate total based on updated item details
    const updatedTotal = updatedRequest.items.reduce((acc, item) => {
      return acc + parseFloat(item.agreedPrice) * parseInt(item.quantity);
    }, 0);

    // Update status based on the updated total
    const updatedStatus = updatedTotal < 100000 ? 'approved' : 'pending';

    // Update the request with new total and status
    updatedRequest.total = updatedTotal;
    updatedRequest.status = updatedStatus;

    // Save the updated request
    await updatedRequest.save();

    // Request updated successfully, send the updated request as response
    res.status(200).json(updatedRequest);
  } catch (error) {
    // Handle errors, send a 500 response with the error message
    console.error('Error updating request', error);
    res.status(500).json({ error: 'Internal Server Error' });
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