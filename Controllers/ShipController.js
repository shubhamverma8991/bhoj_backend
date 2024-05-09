const Shipment = require("../Models/Shipment");

// Variable to keep track of the counter for shipmentId
let shipmentCounter = 1;

// Create shipment controller
exports.createShipment = async (req, res) => {
  try {
    const { shipper, receiver, parceltype } = req.body;

    // Extract first 3 letters of the states from the shipper and receiver addresses
    const fromStateInitials = shipper.shipperAddress.state.substring(0, 3).toUpperCase();
    const toStateInitials = receiver.receiverAddress.state.substring(0, 3).toUpperCase();

    // Generate shipmentId
    const shipmentId = `${fromStateInitials}-${toStateInitials}-${parceltype.substring(0, 3).toUpperCase()}-${shipmentCounter}`;

    // Update status
    const status = "Booked";

    // Create a new shipment object with status and shipmentId included
    const newShipment = new Shipment({ ...req.body, status, shipmentId });

    // Save the new shipment to the database
    const savedShipment = await newShipment.save();
    
    // Increment the counter for next shipmentId
    shipmentCounter++;

    res.status(201).json(savedShipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating shipment' });
  }
};
