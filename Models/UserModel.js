const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Your last name is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: [true, "Your mobile number is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Your gender is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  branch: {
    type: String,
    required: [true, "Your branch is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Your date of birth is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
