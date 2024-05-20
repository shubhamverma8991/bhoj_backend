const Client = require("../Models/Client");

// POST method to create new Client
exports.createClient = async (req, res) => {
  try {
    // Extract Clients details from request body
    const {
      clientName,
      clientId,
      GSTIN,
      invoiceId,
      location,
      BaseFare,
      MobileNo,
    } = req.body;

    // Create a new Client object
    const newClient = new Client({
      clientName,
      clientId,
      GSTIN,
      invoiceId,
      location,
      BaseFare,
      MobileNo,
    });

    // Save the Client object to database
    const savedClient = await newClient.save();

    // Return the saved Quotation object as JSON response
    res.status(201).json(savedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating Client" });
  }
};

//GET Method to get all Clients data
exports.getAllClients = async (req, res) => {
  try {
    // Fetch all Clients from the database
    const clients = await Client.find();

    // If there are no Clients found, return 404 status code
    if (!clients || clients.length === 0) {
      return res.status(404).json({ message: "No Clients found" });
    }

    // If Clients are found, return them as JSON response
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Clients" });
  }
};
