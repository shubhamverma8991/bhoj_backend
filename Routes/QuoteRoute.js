const {createQuote, getAllQuotes, calculateAllPrices} = require("../Controllers/QuoteController");

const router = require("express").Router();

router.post("/createQuote", createQuote);
router.get("/getAllQuotes", getAllQuotes);
router.get("/calculateAllPrices", calculateAllPrices);

module.exports = router;