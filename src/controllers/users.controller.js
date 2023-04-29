const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting user");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).send("Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, interest } = req.body;

    // Check if user with given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already exists with this email" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      passwordHash,
      interest
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "1h",
    });

    // Send response with token and user details
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        interest: newUser.interest
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error occurred while creating user" });
  }
};

module.exports = {
  getUser,
  createUser,
  login,
};
