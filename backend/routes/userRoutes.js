const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")


// user register
router.post("/register", userController.registerUser);

// user login
router.post("/login", userController.login);




module.exports = router;
