const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// POST method to Register a new user(./signup)
module.exports.Signup = async (req, res, next) => {
  try {
    const {
      email,
      password,
      username,
      firstName,
      lastName,
      mobileNumber,
      gender,
      branch,
      dateOfBirth,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Generate employeeId based on branch
    const branchInitials = branch.substring(0, 3).toUpperCase();
    const count = await User.countDocuments({ branch });
    const employeeId = `${branchInitials}-${count + 1}`;

    const newUser = await User.create({
      email,
      password,
      username,
      firstName,
      lastName,
      mobileNumber,
      gender,
      branch,
      dateOfBirth,
      employeeId: employeeId,
    });

    const token = createSecretToken(newUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: newUser,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};

// POST method to Login a user(./login)
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Incorrect email" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: "Incorrect password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      firstName: user.firstName,
      lastName: user.lastName,
      branch: user.branch,
      token: token,
      employeeId: user.employeeId,

    });

    next();
  } catch (error) {
    console.error(error);
  }
};

// GET method to get all users(./users)
module.exports.getAllUsers = async (req, res, next) => {
  try {
    // Query all users from the database
    const users = await User.find();

    // Send the users as JSON response
    res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};