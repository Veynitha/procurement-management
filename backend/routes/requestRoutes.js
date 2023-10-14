// const express = require('express');
// const router = express.Router();
// const RequestController = require('../controllers/requestController');



// // Create a new request
// router.post('/requests', async (req, res) => {
//   await requestController.createRequest(req, res);
// });



// module.exports = router;

const express = require("express");
const router = express.Router();
const RequestController = require('../controllers/requestController');

router.post("/request", RequestController.createRequest);
router.get('/request', RequestController.getAllRequests);
router.put('/updateRequest/:id', RequestController.updateRequestStatus);
router.get('/get-request/:id',RequestController.getRequest);

module.exports = router;

