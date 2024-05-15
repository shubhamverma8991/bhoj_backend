const Quotation = require("../Models/Quotation");

// POST method to create new quotation
exports.createQuote = async (req, res) => {
    try {
        // Extract shipment details from request body
        const { weight, withinCity, allCG, allIndia } = req.body;
    
        // Create a new Quotation object
        const newQuotation = new Quotation({
        weight,
        withinCity,
        allCG,
        allIndia
        });
    
        // Save the Quotation object to database
        const savedQuotation = await newQuotation.save();
    
        // Return the saved Quotation object as JSON response
        res.status(201).json(savedQuotation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating quotation' });
    }
}

// GET method to get all quotations
exports.getAllQuotes = async (req, res) => {
    try {
        // Fetch all quotations from the database
        const quotations = await Quotation.find();
    
        // If there are no quotations found, return 404 status code
        if (!quotations || quotations.length === 0) {
        return res.status(404).json({ message: "No quotations found" });
        }
    
        // If quotations are found, return them as JSON response
        res.status(200).json(quotations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching quotations' });
    }
}

// Get method to get quotation by weight
exports.getQuoteByWeight = async (req, res) => {
    try {
        // Extract weight from request parameters
        const { weight } = req.params;
    
        // Fetch Quotation by weight from Database
        const quotation = await Quotation.findOne({ weight });
    
        // If there is no quotation found, return 404 status code
        if (!quotation) {
        return res.status(404).json({ message: "Quotation not found" });
        }
    
        // If quotation is found, return it as JSON response
        res.status(200).json(quotation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching quotation' });
    }
}