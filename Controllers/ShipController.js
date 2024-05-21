const Shipment = require("../Models/Shipment");
const bcrypt = require('bcrypt');

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

    // Generate Tracking ID to track the package
    const trackingId = await generateTrackingId(shipper.name, parceltype, shipmentId);

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

// Function to generate a unique tracking ID
async function generateTrackingId(shipperDetails, parcelType, shipmentId) {
  // Get the current date and time
  const now = new Date();
  
  // Format the timestamp as YYYYMMDDHHMMSS
  const timestamp = now.toISOString().replace(/[-T:.Z]/g, '');
  
  // Create the base tracking ID using shipper details, parcel type, and shipment ID
  const baseTrackingId = `${shipperDetails}-${parcelType}-${shipmentId}-${timestamp}`;
  
  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  
  // Hash the base tracking ID with bcrypt
  const hash = await bcrypt.hash(baseTrackingId, salt);
  
  // Return the first 16 characters of the hash as the tracking ID
  return hash.replace(/[^A-Z0-9]/g, '').substring(0, 16);
}

// GET method to get all shipments (./getShipments)
exports.getAllShipments = async (res) => {
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
    res.status(500).json({ message: "Error fetching shipments" });
  }
};

// GET method to get shipment by trackingId
exports.getShipByTrackingId = async (req, res) => {
  try {
    // Extract trackingId from request body
    const { trackingId } = req.query;

    // Fetch Shipment by trackingId from Database
    const shipment = await Shipment.findOne({ trackingId });

    // If there is no shipment found, return 404 status code
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // If shipment is found, return it as JSON response
    res.status(200).json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching shipment" });
  }
};

