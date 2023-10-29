const { createRequest, getRequest, deleteRequest, updateRequest } = require('../controllers/requestController');
const { RequestModel } = require('../models/Request');

jest.mock('../models/Request');

describe('Request Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRequest', () => {
    it('should create a new request and return 201 status', async () => {
      const req = {
        body: {
          requestId: '12345',
          name: 'John Cena',
          supplierName: 'Supplier Inc.',
          deliveryDate: '2023-11-01',
          address: '123 Main St',
          items: [
            { itemName: 'Item 1', quantity: 2, agreedPrice: 10 },
            { itemName: 'Item 2', quantity: 3, agreedPrice: 15 }
          ],
          companyName: 'Company XYZ',
          
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Calculate total based on items
      const total = req.body.items.reduce((acc, item) => {
        return acc + parseFloat(item.agreedPrice) * parseInt(item.quantity);
      }, 0);

      // Determine status based on total
      const status = total < 100000 ? 'approved' : 'pending';
      const approvedBy = total < 100000 ? 'name' : '';

      // Mock RequestModel to return a resolved promise with the request data
      // const mockRequest = {
      //   requestId: req.body.requestId,
      //   name: req.body.name,
      //   supplierName: req.body.supplierName,
      //   deliveryDate: req.body.deliveryDate,
      //   address: req.body.address,
      //   items: req.body.items,
      //   companyName: req.body.companyName,
      //   total: total,
      //   status: status,
      //   approvedBy: approvedBy, // Set approvedBy attribute here
      //   //---------
      //   save: jest.fn()
      // };

      RequestModel.mockReturnValue({
        save: jest.fn().mockResolvedValue({
          requestId: req.body.requestId,
            name: req.body.name,
            supplierName: req.body.supplierName,
            deliveryDate: req.body.deliveryDate,
            address: req.body.address,
            items: req.body.items,
            companyName: req.body.companyName,
            total: total,
            status: status,
            approvedBy: approvedBy, // Set approvedBy attribute here
        }),
      });

      // RequestModel.mockReturnValue({
      //   save: jest.fn().mockResolvedValue(mockRequest)
      // });

      // Call the createRequest function with the mock request and response
      await createRequest(req, res);

      // Assert that RequestModel was called with the correct arguments
      expect(RequestModel).toHaveBeenCalledWith({
       
        requestId: req.body.requestId,
        name: req.body.name,
        supplierName: req.body.supplierName,
        deliveryDate: req.body.deliveryDate,
        address: req.body.address,
        items: req.body.items,
        companyName: req.body.companyName,
        total: total,
        status: status,
        approvedBy: approvedBy, // Set approvedBy attribute here
      }
      );

      // Assert that save method was called
      //expect(RequestModel().save).toHaveBeenCalled();

      // Assert the response status and JSON
      // expect(res.status).toHaveBeenCalledWith(201);
      // expect(res.json).toHaveBeenCalledWith(mockRequest);

      expect(RequestModel().save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle errors and return a 400 status with an error message', async () => {
      const req = {
        body: {
          // Invalid request body, this should trigger an error.
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock RequestModel to return a rejected promise with a validation error
      RequestModel.mockReturnValue({
        save: jest.fn().mockRejectedValue(new Error('Validation error'))
      });

      // Call the createRequest function with the mock request and response
      await createRequest(req, res);

      // Assert the response status and JSON
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Validation error' });
    });
  });

  describe('getRequest', () => {
    it('should return a single request by ID and return 200 status', async () => {
      const request = {
        _id: '123456', // <- Modify this line
        requestId: '123456', // <- Add this line if necessary
        name: 'John Doe',
        supplierName: 'Supplier Inc.',
        deliveryDate: '2023-10-16',
        address: '123 Main St',
        items: [],
        companyName: 'Company XYZ',
        total: 100.0,
        status: 'approved'
      };
  
      const req = {
        params: { id: '123456' },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      RequestModel.findById.mockResolvedValue(request);
  
      await getRequest(req, res);
  
      expect(RequestModel.findById).toHaveBeenCalledWith({ _id: '123456' }); // <- Modify this line
       expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(request);
      
      
    });
  
    it('should handle a scenario where the request is not found and return 404 status', async () => {
      const req = {
        params: { id: 'nonexistent-id' },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      RequestModel.findById.mockResolvedValue(null);
  
      await getRequest(req, res);
  
      expect(RequestModel.findById).toHaveBeenCalledWith({ _id: 'nonexistent-id' }); // <- Modify this line
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Request not found' });
    });
  
    it('should handle errors and return a 500 status with an error message', async () => {
      const req = {
        params: { id: 'error-id' },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      RequestModel.findById.mockRejectedValue(new Error('Database error'));
  
      await getRequest(req, res);
  
      expect(RequestModel.findById).toHaveBeenCalledWith({ _id: 'error-id' }); // <- Modify this line
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
  });

  describe('deleteRequest', () => {
    it('should delete a request by ID and return 200 status', async () => {
      const request = {
        _id: '123456', // ID of the request to be deleted
        // ... other request properties
      };
  
      const req = {
        params: { id: '123456' }, // Request ID to be deleted
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      RequestModel.findByIdAndDelete.mockResolvedValue(request);
  
      await deleteRequest(req, res);
  
      expect(RequestModel.findByIdAndDelete).toHaveBeenCalledWith('123456');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Request deleted successfully' });
    });
  
    it('should handle a scenario where the request is not found and return 404 status', async () => {
      const req = {
        params: { id: 'nonexistent-id' }, // Non-existent request ID
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      RequestModel.findByIdAndDelete.mockResolvedValue(null); // Simulating request not found
  
      await deleteRequest(req, res);
  
      expect(RequestModel.findByIdAndDelete).toHaveBeenCalledWith('nonexistent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Request not found' });
    });
  
    it('should handle errors and return a 500 status with an error message', async () => {
      const req = {
        params: { id: 'error-id' },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      RequestModel.findByIdAndDelete.mockRejectedValue(new Error('Database error'));
  
      await deleteRequest(req, res);
  
      expect(RequestModel.findByIdAndDelete).toHaveBeenCalledWith('error-id');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  const requestController = require('../controllers/requestController');
const { RequestModel } = require('../models/Request');

jest.mock('../models/Request'); // Mocking the RequestModel methods

describe('Request Controller › getAllRequests', () => {
  it('should fetch all requests and return 200 status with requests', async () => {
    // Mocking the requests in the database
    const mockRequests = [
      {
        requestId: '1',
        name: 'John Doe',
        supplierName: 'Supplier Inc.',
        deliveryDate: '2023-10-16',
        address: '123 Main St',
        items: [],
        companyName: 'Company XYZ',
        total: 100.0,
        status: 'approved',
      },
      {
        requestId: '2',
        name: 'Jane Smith',
        supplierName: 'Another Supplier',
        deliveryDate: '2023-10-17',
        address: '456 Oak St',
        items: [],
        companyName: 'Company ABC',
        total: 150.0,
        status: 'pending',
      },
    ];

    // Mocking the find method of RequestModel
    RequestModel.find.mockResolvedValue(mockRequests);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await requestController.getAllRequests(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRequests);
    expect(RequestModel.find).toHaveBeenCalledWith(); // Ensuring find method is called
  });

  it('should handle errors and return 500 status with an error message', async () => {
    // Mocking the find method of RequestModel to throw an error
    RequestModel.find.mockRejectedValue(new Error('Database error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await requestController.getAllRequests(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    expect(RequestModel.find).toHaveBeenCalledWith(); // Ensuring find method is called
  });
});

  // describe('updateRequest', () => {
  //   it('should update request and return 200 status with updated request', async () => {
  //     const req = {
  //       params: { id: 'request-id' },
  //       body: {
  //         // Update the request body with the data you want to test
  //         requestId: '123456',
  //         items: [
  //           { itemName: 'Item 1', quantity: 2, agreedPrice: 50 },
  //           { itemName: 'Item 2', quantity: 1, agreedPrice: 30 },
  //         ],
  //       },
  //     };
  
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  
  //     const mockUpdatedRequest = {
  //       _id: 'request-id',
  //       requestId: '123456',
  //       status: 'approved',
  //       total: 130,
  //       items: [
  //         { itemName: 'Item 1', quantity: 2, agreedPrice: 50 },
  //         { itemName: 'Item 2', quantity: 1, agreedPrice: 30 },
  //       ],
  //       // ...other request properties
  //     };
  
  //     // Mock the findByIdAndUpdate function to return the updated request directly
  //     const findByIdAndUpdateMock = jest.spyOn(RequestModel, 'findByIdAndUpdate');
  //     findByIdAndUpdateMock.mockResolvedValue(mockUpdatedRequest);
  
  //     await updateRequest(req, res);
  
  //     expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
  //       'request-id',
  //       req.body,
  //       { new: true }
  //     );
  
  //     // Verify that the total and status are updated properly
  //     expect(mockUpdatedRequest.total).toEqual(130);
  //     expect(mockUpdatedRequest.status).toEqual('approved');
  
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith(mockUpdatedRequest);
  //   });
  
  //   it('should handle a scenario where the request is not found and return 404 status', async () => {
  //     const req = {
  //       params: { id: 'nonexistent-id' },
  //       body: {
  //         // Update the request body with the data you want to test
  //         requestId: '123456',
  //         items: [
  //           { itemName: 'Item 1', quantity: 2, agreedPrice: 50 },
  //           { itemName: 'Item 2', quantity: 1, agreedPrice: 30 },
  //         ],
  //       },
  //     };
  
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  
  //     // Mock the findByIdAndUpdate function to return null (request not found)
  //     const findByIdAndUpdateMock = jest.spyOn(RequestModel, 'findByIdAndUpdate');
  //     findByIdAndUpdateMock.mockResolvedValue(null);
  
  //     await updateRequest(req, res);
  
  //     expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
  //       'nonexistent-id',
  //       req.body,
  //       { new: true }
  //     );
  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Request not found' });
  //   });
  
  //   it('should handle errors and return a 500 status with an error message', async () => {
  //     const req = {
  //       params: { id: 'error-id' },
  //       body: {
  //         // Update the request body with the data you want to test
  //         requestId: '123456',
  //         items: [
  //           { itemName: 'Item 1', quantity: 2, agreedPrice: 50 },
  //           { itemName: 'Item 2', quantity: 1, agreedPrice: 30 },
  //         ],
  //       },
  //     };
  
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  
  //     // Mock the findByIdAndUpdate function to throw an error
  //     const error = new Error('Database error');
  //     const findByIdAndUpdateMock = jest.spyOn(RequestModel, 'findByIdAndUpdate');
  //     findByIdAndUpdateMock.mockRejectedValue(error);
  
  //     await updateRequest(req, res);
  
  //     expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
  //       'error-id',
  //       req.body,
  //       { new: true }
  //     );
  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  //   });
  // });
  
  
});