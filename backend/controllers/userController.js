const User = require("../models/user");
const jwt = require("jsonwebtoken");

// --------- registration of the user --------- //
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // create a new User object
  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
  } catch (error) {
    console.log("Error registering user", err);
    res.status(500).json({ message: "Error registering the user!" });
  }

  //res.status(200).json({ message: "User registered successfully" });
  res.status(201).json({ user: newUser });
};

// --------- create a token for the user --------- //
const createToken = (userId) => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

  return token;
};

// --------- logging in of that particular user --------- //
const login = async (req, res) => {
  const { email, password } = req.body;
  let user;

  //check if the email and password are provided
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and the password are required" });
  }

  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.log("error in finding the user", error);
    res.status(500).json({ message: "Internal server Error!" });
  }
  if (user.password !== password) {
    return res.status(404).json({ message: "Invalid Password!" });
  } else {
    const token = createToken(user._id);
    res.status(200).json({ token });
  }
};


module.exports = {
  registerUser,
  login,
};
