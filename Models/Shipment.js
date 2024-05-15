const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipper: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
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
      type: String
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
    enum:["DOC","FLT","ELC"],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    baseFair:{
      type: Number,
      required: true
    },
    sgst:{
      type: Number
    },
    cgst:{
      type: Number
    },
    igst:{
      type: Number
    },
    fuelCost:{
      type: Number
    },
    finalAmmount:{
      type: Number
    }
  },
  bookingdate: {
    type: Date,
    required: true
  },
  estdeliverydate: {
    type: Date,
    required: true
  },
  status: {
    type: String
  },
  bookedAt:{
    type:Date
  },
  employeeId:{
    type: String
  },
  invoiceId:{
    type: String
  },
  shipmentId: {
    type: String
  },
  trackingId:{
    type: String
  }      
});

module.exports = mongoose.model("Shipment", shipmentSchema);
