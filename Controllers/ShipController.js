const Shipment = require("../Models/Shipment");

// Function to generate shipmentId
const generateShipmentId = (shipperState, receiverState, parceltype, counter) => {
  const fromStateInitials = shipperState.substring(0, 3).toUpperCase();
  const toStateInitials = receiverState.substring(0, 3).toUpperCase();
  return `${fromStateInitials}-${toStateInitials}-${parceltype.substring(0, 3).toUpperCase()}-${counter}`;
};

// Function to update status
const updateStatus = () => "Booked";

// Create shipment controller
exports.createShipment = async (req, res) => {
  try {
    // Validate required fields
    const { shipper, receiver, parceltype } = req.body;
    if (!shipper || !receiver || !parceltype) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Generate shipmentId
    const shipmentId = generateShipmentId(shipper.shipperAddress.state, receiver.receiverAddress.state, parceltype, shipmentCounter);

    // Update status
    const status = updateStatus();

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
