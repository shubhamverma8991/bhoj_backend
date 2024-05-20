const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  GSTIN: {
    type: String,
    required: true,
  },
  invoiceId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  BaseFare: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Client", clientSchema);
