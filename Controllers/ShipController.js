const Shipment = require("../Models/Shipment");

// Variable to keep track of the counter for shipmentId
let shipmentCounter = 1;

// POST method to Create new shipment (./createShip)
exports.createShipment = async (req, res) => {
  try {
    const { shipper, receiver, parceltype, employeeId } = req.body;

    // Extract first 3 letters of the states from the shipper and receiver addresses
    const fromStateInitials = shipper.shipperAddress.state.substring(0, 3).toUpperCase();
    const toStateInitials = receiver.receiverAddress.state.substring(0, 3).toUpperCase();

    // Generate shipmentId
    const shipmentId = `${fromStateInitials}-${toStateInitials}-${parceltype.substring(0, 3).toUpperCase()}-${shipmentCounter}`;

    // Update status
    const status = "Booked";

    // Booking generating time
    const bookedAt = new Date();

    // EmployeeID of the person creating the booking
    const empId = employeeId;

    // Tracking ID to track the package (using a unique identifier, e.g., UUID)
    const trackingId = generateTrackingId();

    // Create a new shipment object with status, shipmentId, employeeId, and trackingId included
    const newShipment = new Shipment({ ...req.body, status, bookedAt, shipmentId, empId, trackingId });

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

// Function to generate a unique tracking ID (e.g., using UUID)
function generateTrackingId() {
  
  const uuid = require('uuid');
  return uuid.v4();
}

// GET method to get all shipments (./getShipments)
exports.getAllShipments = async (req, res) => {
  try {
    // Fetch all shipments from the database
    const shipments = await Shipment.find();

    // If there are no shipments found, return 404 status code
    if (!shipments || shipments.length === 0) {
      return res.status(404).json({ message: "No shipments found" });
    }

    // If shipments are found, return them as JSON response
    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching shipments' });
  }
};

// GET method to get shipment by ID
exports.getShipById = async (req, res) => {
  try {
    // Extract shipmentId from request parameters
    const { trackingId } = req.params;

    // Fetch Shipment by shipmentId from Database
    const shipment = await Shipment.findOne({ trackingId });

    // If there is no shipment found, return 404 status code
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // If shipment is found, return it as JSON response
    res.status(200).json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching shipment' });
  }
};
