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

// GET method to calculate total prices based on weight
exports.getPriceByWeight = async (req, res) => {
    try {
        // Extract weight from request body
        const { weight } = req.query;

        // Fetch all quotations from the database
        const quotations = await Quotation.find();

        // If no quotations found, return 404 status code
        if (!quotations || quotations.length === 0) {
            return res.status(404).json({ message: "No quotations found" });
        }

        // Find the quotation that covers the weight range in which the provided weight falls
        let quotation = quotations.find(q => parseInt(q.weight) >= weight);

        // If no quotation found, find the last quotation in the list
        if (!quotation) {
            quotation = quotations[quotations.length - 1];
        }

        // Initialize total prices
        let withinCityPrice = parseInt(quotation.withinCity);
        let allCGPrice = parseInt(quotation.allCG);
        let allIndiaPrice = parseInt(quotation.allIndia);

        // If weight is above 1000 grams, calculate additional prices for every 500 grams
        if (weight > 1000) {
            const additionalWeight = weight - 1000;
            const additionalIncrements = Math.ceil(additionalWeight / 500); // Rounds up to the nearest 500g

            withinCityPrice += additionalIncrements * 55; // Additional cost per 500g
            allCGPrice += additionalIncrements * 70;
            allIndiaPrice += additionalIncrements * 110;
        }

        // Return the total prices as JSON response
        res.status(200).json({ withinCityPrice, allCGPrice, allIndiaPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error calculating prices' });
    }
}
