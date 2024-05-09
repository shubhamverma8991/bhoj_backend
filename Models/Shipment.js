const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipper: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phonenumber: {
      type: Number,
      required: true
    },
    shipperAddress: {
      street: String,
      city: String,
      state: String
    }
  },
  receiver: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phonenumber: {
      type: Number,
      required: true
    },
    receiverAddress: {
      street: String,
      city: String,
      state: String
    }
  },
  parceltype: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  finalamount: {
    type: Number,
    required: true
  },
  bookingdate: {
    type: Date,
    required: true
  },
  estdeliverydate: {
    type: Date,
    required: true
  },
  empid: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Shipment", shipmentSchema);
