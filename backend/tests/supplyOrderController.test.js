const {
  createSupplyOrder,
  getAllSupplyOrders,
  incrementDeliveryCount,
  addItemToSupplyOrder,
  removeItemFromSupplyOrder,
  getSupplyOrderById,
} = require('../controllers/supplyOrderController'); // Replace with the actual path to your controller file.
const SupplyOrder = require('../models/supplyOrderModel');
const Invoice = require('../models/invoiceModel');

jest.mock('../models/supplyOrderModel');
jest.mock('../models/invoiceModel');

describe('Supply Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSupplyOrder', () => {
    it('should create a new supply order and return 201 status', async () => {
      const req = {
        body: {
          purchaseOrderReference: 'Unit Test 1',
          createdAt: '2023-10-17T14:45:00',
          deliveryAddress: 'unit test street unit test city',
          requiredDate: '2023-11-10T19:00:00',
          companyDetails: 'Unit Test Catering',
          total: 0,
          orderStatus: 'pending',
          items: [],
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      SupplyOrder.mockReturnValue({
        save: jest.fn().mockResolvedValue({
          purchaseOrderReference: req.body.purchaseOrderReference,
          createdAt: req.body.createdAt,
          deliverCount: 0,
          deliveryAddress: req.body.deliveryAddress,
          itemCount: 0,
          requiredDate: req.body.requiredDate,
          companyDetails: req.body.companyDetails,
          total: req.body.total,
          orderStatus: req.body.orderStatus,
          items: req.body.items
        }),
      });

      await createSupplyOrder(req, res);

      expect(SupplyOrder).toHaveBeenCalledWith({
        purchaseOrderReference: req.body.purchaseOrderReference,
        createdAt: req.body.createdAt,
        deliverCount: 0,
        deliveryAddress: req.body.deliveryAddress,
        itemCount: 0,
        requiredDate: req.body.requiredDate,
        companyDetails: req.body.companyDetails,
        total: req.body.total,
        orderStatus: req.body.orderStatus,
        items: req.body.items
      });
      
      expect(SupplyOrder().save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);

    });

    it('should handle errors and return a 400 status with an error message', async () => {
      const req = {
        body: {
          purchaseOrderReference: 'Unit Test 2',
          createdAt: '2023-10-17T14:45:00',
          deliveryAddress: 'unit test street unit test city',
          requiredDate: '2023-11-10T19:00:00',
          companyDetails: 'Unit Test Catering',
          total: 0,
          orderStatus: 'pending',
          items: [],
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      SupplyOrder.mockReturnValue({
        save: jest.fn().mockRejectedValue(new Error('Validation error')),
      });

      await createSupplyOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(400); 
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Validation error'
        })
      );
    });
  });

  describe('getAllSupplyOrders', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear any previous mock call records.
    });
    it('should return a list of supply orders and return 200 status', async () => {
      const supplyOrders = [
        {
          purchaseOrderReference: 'Unit Test 2',
          createdAt: '2023-10-17T14:45:00',
          deliveryAddress: 'unit test street unit test city',
          requiredDate: '2023-11-10T19:00:00',
          companyDetails: 'Unit Test Catering',
          total: 0,
          orderStatus: 'pending',
          items: [],
        }
      ];
  
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      SupplyOrder.find.mockResolvedValue(supplyOrders);
  
      await getAllSupplyOrders(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(supplyOrders); 
    });
  });

  describe('incrementDeliveryCount', () => {
    it('should increment delivery count and update the supply order', async () => {
      const req = {
        body: {
          id: "sampleOrderId",
          deliverCount: 1,
          itemCount: 2
        },
      };
    
      const res = {
        json: jest.fn(),
      };
    
      const updatedSupplyOrderData = {
        _id: 'sampleOrderId',
        orderReference: 'Updated Order Reference',
        deliveryCount: 2,
      };
    
      // Mock the SupplyOrder model's findByIdAndUpdate method
      SupplyOrder.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedSupplyOrderData);
    
      await incrementDeliveryCount(req, res);
    
      // Assertions
      expect(SupplyOrder.findByIdAndUpdate).toHaveBeenCalledWith('sampleOrderId', {
        deliverCount: 1 + 1 
      });
      expect(res.json).toHaveBeenCalledWith(updatedSupplyOrderData);
    });
});

  describe('addItemToSupplyOrder', () => {
    it('should add an item to the supply order and return a success response', async () => {
      const req = {
        body: {
          id: "sampleOrderId",
          item: {
            itemName: "Widget",
            quantity: 10,
            agreedPrice: 2.50
          },
          itemCount: 2,
          total: 100.5
        },
      };
  
      const res = {
        json: jest.fn(),
      };
  
      const updatedSupplyOrderData = {
        purchaseOrderReference: 'Unit Test 2',
        createdAt: '2023-10-17T14:45:00',
        deliveryAddress: 'unit test street unit test city',
        requiredDate: '2023-11-10T19:00:00',
        companyDetails: 'Unit Test Catering',
        total: 0,
        orderStatus: 'pending',
        items: []
      };
  
      // Mock the SupplyOrder model's findByIdAndUpdate method
      SupplyOrder.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedSupplyOrderData);
  
      await addItemToSupplyOrder(req, res);
  

      expect(SupplyOrder.findByIdAndUpdate).toHaveBeenCalledWith('sampleOrderId', {
        $push: { items: {itemName: "Widget",quantity: 10,agreedPrice: 2.50} }, 
        $inc:  { itemCount: 1 }, 
        $inc: { total: 2.50 * 10 }, 
      }, {new: true});
    });

    // it('should handle errors and return an error response', async () => {
    //   const req = {
    //     body: {
    //       // Invalid request body or other error scenario.
    //     },
    //   };

    //   const res = {
    //     json: jest.fn(),
    //   };

    //   SupplyOrder.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    //   await addItemToSupplyOrder(req, res);

    //   // Assertions here...
    // });
  });

  // describe('removeItemFromSupplyOrder', () => {
  //   it('should remove an item from the supply order and return a success response', async () => {
  //     const req = {
  //       body: {
  //         // Provide request body data.
  //       },
  //     };

  //     const res = {
  //       json: jest.fn(),
  //     };

  //     SupplyOrder.findById.mockResolvedValue({
  //       // Provide the supply order data.
  //       items: [{}, {}], // Add items to simulate removal.
  //     });

  //     await removeItemFromSupplyOrder(req, res);

  //     // Assertions here...
  //   });

  //   it('should handle errors and return an error response', async () => {
  //     const req = {
  //       body: {
  //         // Invalid request body or other error scenario.
  //       },
  //     };

  //     const res = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };

  //     SupplyOrder.findById.mockRejectedValue(new Error('Database error'));

  //     await removeItemFromSupplyOrder(req, res);

  //     // Assertions here...
  //   });
  // });

  describe('getSupplyOrderById', () => {
    it('should return a supply order by ID and return 200 status', async () => {
      const req = {
        params: {
          id: 'sample-id',
        },
      };
    
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    
      const supplyOrderData = {
        // Provide the supply order data.
        orderReference: 'Sample Order',
        // Include other supply order properties.
      };
    
      // Mock the SupplyOrder model's findById method
      SupplyOrder.findById = jest.fn().mockResolvedValue(supplyOrderData);
    
      await getSupplyOrderById(req, res);
    
      // Assertions
      expect(SupplyOrder.findById).toHaveBeenCalledWith('sample-id'); // Verify that findById is called with the provided ID
      expect(res.status).toHaveBeenCalledWith(200); // Verify that the response status is set to 200
      expect(res.json).toHaveBeenCalledWith(supplyOrderData); // Verify that the response contains the supply order data
    });

    it('should handle scenarios where the supply order is not found and return a 404 status', async () => {
      const req = {
        params: {
          id: 'nonexistent-id',
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      SupplyOrder.findById.mockResolvedValue(null);

      await getSupplyOrderById(req, res);

      // Assertions here...
    });

    it('should handle errors and return a 500 status with an error message', async () => {
      const req = {
        params: {
          id: 'error-id',
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      SupplyOrder.findById.mockRejectedValue(new Error('Database error'));

      await getSupplyOrderById(req, res);

      // Assertions here...
    });
  });
});
