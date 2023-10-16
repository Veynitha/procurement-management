

const express = require("express");
const router = express.Router();
const RequestController = require('../controllers/requestController');

router.post("/request", RequestController.createRequest);
router.get('/request', RequestController.getAllRequests);

router.delete('/request/:id', RequestController.deleteRequest);
// router.get('/request/:id', RequestController.getRequestDetails);
router.put('/request/:id', RequestController.updateRequest)

router.get('/request/:id', RequestController.getRequest);
router.put('/updateRequest/:id', RequestController.updateRequestStatus);
router.get('/get-request/:id',RequestController.getRequest);


module.exports = router;

