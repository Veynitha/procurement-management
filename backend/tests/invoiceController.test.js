const { createInvoice, getInvoices, getInvoiceById } = require('../controllers/invoicesController'); // Replace with the actual path to your controller file.
const Invoice = require('../models/invoiceModel');

jest.mock('../models/invoiceModel'); // Mock the 'invoiceModel' to isolate the tests.

describe('Invoice Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createInvoice', () => {
    it('should create a new invoice and return 201 status', async () => {
      const req = {
        body: {
          InvoiceDate: '2023-10-16',
          DueAmount: 100.0,
          OrderReference: '12345',
          POReference: 'PO123',
          items: [],
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Invoice.mockReturnValue({
        save: jest.fn().mockResolvedValue({
          InvoiceDate: req.body.InvoiceDate,
          DueAmount: req.body.DueAmount,
          OrderReference: req.body.OrderReference,
          POReference: req.body.POReference,
          items: req.body.items,
        }),
      });

      await createInvoice(req, res);

      expect(Invoice).toHaveBeenCalledWith({
        InvoiceDate: req.body.InvoiceDate,
        DueAmount: req.body.DueAmount,
        OrderReference: req.body.OrderReference,
        POReference: req.body.POReference,
        items: req.body.items,
      });

      expect(Invoice().save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle errors and return a 400 status with an error message', async () => {
      const req = {
        body: {
          // Invalid request body, this should trigger an error.
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Invoice.mockReturnValue({
        save: jest.fn().mockRejectedValue(new Error('Validation error')),
      });

      await createInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Validation error' });
    });
  });

  describe('getInvoices', () => {
    it('should return a list of invoices and return 200 status', async () => {
      const invoices = [
        { InvoiceDate: '2023-10-16', DueAmount: 100.0, OrderReference: '12345', POReference: 'PO123', items: [] },
        // Add more invoice objects as needed.
      ];

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Invoice.find.mockResolvedValue(invoices);

      await getInvoices(req, res);

      expect(Invoice.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(invoices);
    });

    it('should handle errors and return a 500 status with an error message', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Invoice.find.mockRejectedValue(new Error('Database error'));

      await getInvoices(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('getInvoiceById', () => {
    it('should return a single invoice by ID and return 200 status', async () => {
      const invoice = {
        InvoiceDate: '2023-10-16',
        DueAmount: 100.0,
        OrderReference: '12345',
        POReference: 'PO123',
        items: [],
      };

      const req = {
        params: { id: '123456' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Invoice.findById.mockResolvedValue(invoice);

      await getInvoiceById(req, res);

      expect(Invoice.findById).toHaveBeenCalledWith('123456');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(invoice);
    });

    it('should handle a scenario where the invoice is not found and return 404 status', async () => {
      const req = {
        params: { id: 'nonexistent-id' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Invoice.findById.mockResolvedValue(null);

      await getInvoiceById(req, res);

      expect(Invoice.findById).toHaveBeenCalledWith('nonexistent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invoice not found' });
    });

    it('should handle errors and return a 500 status with an error message', async () => {
      const req = {
        params: { id: 'error-id' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Invoice.findById.mockRejectedValue(new Error('Database error'));

      await getInvoiceById(req, res);

      expect(Invoice.findById).toHaveBeenCalledWith('error-id');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});
