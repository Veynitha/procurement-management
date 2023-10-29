const { createDelivery, getAllDeliverieNotes, getAllDeliveries, updateDeliveriesStatus } = require('../controllers/deliveryController');
const Delivery = require('../models/deliveryModel'); // Assuming you have the Delivery model imported
const DeliveryAdviceNote = require('../models/deliveryAdviceNoteModel'); // Assuming you have the DeliveryAdviceNote model imported

// Mocking the necessary dependencies for the test
jest.mock('../models/deliveryModel');
jest.mock('../models/deliveryAdviceNoteModel');


describe('createDelivery', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        deliveredBy: 'kamal',
        item: {
          itemName: 'Sand',
          quantity: 5,
          agreedPrice: 10000,
        },
        contactNo: '1234567890',
        deliveryLocation: 'Malabe',
        supplierOrderReference: '9238482034920948',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should create a delivery and a delivery advice note', async () => {
    const savedDelivery = {
      _id: '029238492384',
      deliveredBy:req.body.deliveredBy,
      item: req.body.item,
      contactNo:req.body.contactNo,
      deliveryLocation:req.body.deliveryLocation,
      deliveryStatus: "pending",
    };

    Delivery.mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce(savedDelivery),
    });

    const savedDeliveryAdviceNote = {
      supplierOrderReference:req.body.supplierOrderReference,
      deleveryid: savedDelivery._id,
      item: req.body.item,
      total: req.body.item.quantity * req.body.item.agreedPrice,
      deliveryAdviceNoteStatus: "pending"
    };

    

    DeliveryAdviceNote.mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce(savedDeliveryAdviceNote),
    });

    await createDelivery(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedDelivery);
  });

  it('should handle errors appropriately', async () => {
    const errorMessage = 'Some error message';
    console.error = jest.fn(); // Mock console.error
    Delivery.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    });

    await createDelivery(req, res);

    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(new Error(errorMessage));
  });
});


describe('getAllDeliverieNotes', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return all delivery notes', async () => {
    const fakeDeliveryNotes = [{ note: 'Delivery note 1' }, { note: 'Delivery note 2' }];

    DeliveryAdviceNote.find = jest.fn().mockResolvedValueOnce(fakeDeliveryNotes);

    await getAllDeliverieNotes(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeDeliveryNotes);
  });

  it('should handle errors and return a 500 status with an error message', async () => {
    const errorMessage = 'An error occurred while fetching delivery notes';
    console.error = jest.fn(); // Mock console.error

    DeliveryAdviceNote.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getAllDeliverieNotes(req, res);

    //expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});


describe('getAllDeliveries', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return all deliveries', async () => {
    const fakeDeliveries = [{ delivery: 'Delivery 1' }, { delivery: 'Delivery 2' }];

    Delivery.find = jest.fn().mockResolvedValueOnce(fakeDeliveries);

    await getAllDeliveries(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeDeliveries);
  });

  it('should handle errors and return a 500 status with an error message', async () => {
    const errorMessage = 'An error occurred while fetching delivery';
    console.error = jest.fn(); // Mock console.error

    Delivery.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getAllDeliveries(req, res);

    //expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});


// describe('updateDeliveriesStatus', () => {
//   let req;
//   let res;

//   beforeEach(() => {
//     req = {
//       params: {
//         id: 'someId',
//       },
//       body: {
//         deliveryANStatus: 'someStatus',
//       },
//     };
//     res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };
//   });

//   it('should update the delivery advice note status and return the updated delivery advice note', async () => {
//     const fakeUpdatedDelivery = {
//       _id: 'someId',
//       deliveryAdviceNoteStatus: 'someStatus',
//     };

//     DeliveryAdviceNote.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(fakeUpdatedDelivery);

//     await updateDeliveriesStatus(req, res);

//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Delivery advice note status updated successfully',
//       updatedDeliverie: fakeUpdatedDelivery,
//     });
//   });

//   it('should handle the case when the delivery advice note is not found and return a 404 status with an error message', async () => {
//     const errorMessage = 'Delivery advice note not found';
//     DeliveryAdviceNote.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

//     await updateDeliveriesStatus(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
//   });

//   it('should handle errors and return a 500 status with an error message', async () => {
//     const errorMessage = 'Internal server error';
//     console.error = jest.fn(); // Mock console.error

//     DeliveryAdviceNote.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

//     await updateDeliveriesStatus(req, res);

//     //expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
//   });
// });

describe('updateDeliveriesStatus', () => {
  it('should update delivery advice note status and delivery status', async () => {
    const req = {
      body: {
        deliveryANStatus: 'delivered',
      },
      params: {
        id: '1234567890', // assuming a valid id
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockDeliveryAdviceNote = {
      deleveryid: 'deliveryId123', // assuming a valid delivery id
    };

    const mockUpdatedDeliveryAdviceNote = {
      ...mockDeliveryAdviceNote,
      deliveryAdviceNoteStatus: req.body.deliveryANStatus,
    };

    const mockUpdatedDelivery = {
      deliveryStatus: req.body.deliveryANStatus,
    };

    DeliveryAdviceNote.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockUpdatedDeliveryAdviceNote);
    Delivery.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockUpdatedDelivery);

    await updateDeliveriesStatus(req, res);

    expect(DeliveryAdviceNote.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      { deliveryAdviceNoteStatus: req.body.deliveryANStatus },
      { new: true }
    );
    expect(Delivery.findByIdAndUpdate).toHaveBeenCalledWith(
      mockDeliveryAdviceNote.deleveryid,
      { deliveryStatus: req.body.deliveryANStatus },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith({
      message: 'Delivery advice note status updated successfully',
      updatedDeliverie: mockUpdatedDeliveryAdviceNote,
      updatedDeliverienot: mockUpdatedDelivery,
    });
  });

  it('should handle errors and return a 500 status with an error message', async () => {
    const req = {
      body: {
        // Invalid request body, this should trigger an error.
      },
      params: {
        id: 'invalidId', // assuming an invalid id
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = 'Internal server error';

    DeliveryAdviceNote.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await updateDeliveriesStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});