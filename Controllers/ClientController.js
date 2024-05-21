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
exports.getAllClients = async (res) => {
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

//GET Method to get Client by clientId
exports.getClientByClientId = async (req, res) => {
  try {
    // Extract clientId from request body
    const { clientId } = req.query;

    // Find the Client by clientId
    const client = await Client.findOne({ clientId });

    // If Client is not found, return 404 status code
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // If Client is found, return it as JSON response
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Client" });
  }
};

exports.updateClientByClientId = async (req, res) => {
  try {
    // Extract clientId and other updated Client details from request body
    const {
      clientName,
      clientId,
      GSTIN,
      invoiceId,
      location,
      BaseFare,
      MobileNo,
    } = req.body;

    // Validate that clientId is provided
    if (!clientId) {
      console.log('Client ID is missing in the request body');
      return res.status(400).json({ message: "Client ID is required" });
    }

    // Validate that all necessary fields are provided
    const missingFields = [];
    if (!clientName) missingFields.push('clientName');
    if (!GSTIN) missingFields.push('GSTIN');
    if (!invoiceId) missingFields.push('invoiceId');
    if (!location) missingFields.push('location');
    if (!BaseFare) missingFields.push('BaseFare');
    if (!MobileNo) missingFields.push('MobileNo');

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({ message: "Missing required fields: " + missingFields.join(', ') });
    }

    // Find the Client by clientId and update it
    const updatedClient = await Client.findOneAndUpdate(
      { clientId },
      {
        clientName,
        GSTIN,
        invoiceId,
        location,
        BaseFare,
        MobileNo,
      },
      { new: true, runValidators: true }
    );

    // If Client is not found, return 404 status code
    if (!updatedClient) {
      console.log('Client not found for clientId:', clientId);
      return res.status(404).json({ message: "Client not found" });
    }

    // Return the updated Client as JSON response
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Error updating Client:', error); // Log error
    res.status(500).json({ message: "Error updating Client", error: error.message });
  }
};

// DELETE Method to delete Client by clientId
exports.deleteClientByClientId = async (req, res) => {
  try {
    // Extract clientId from request query
    const { clientId } = req.query;

    // Log clientId to debug
    console.log("clientId:", clientId);

    // Verify that clientId is present in the query
    if (!clientId) {
      return res.status(400).json({ message: "ClientId is required" });
    }

    // Find the Client by clientId and delete it
    const deletedClient = await Client.findOneAndDelete({ clientId });

    // If Client is not found, return 404 status code
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Return the deleted Client and success message as JSON response
    res.status(200).json({ deletedClient, message: "Client deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Client" });
  }
};

//Search Client by Name
exports.searchClientByName = async (req, res) => {
  try {
    // Extract clientName from request body
    const { clientName } = req.query;

    // Find the Client by clientName
    const client = await Client.find({ clientName });

    // If Client is not found, return 404 status code
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Return the Client as JSON response
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Client" });
  }
};