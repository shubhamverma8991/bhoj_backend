// AuthController.js
const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

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

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};
