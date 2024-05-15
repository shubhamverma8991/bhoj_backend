const {createQuote, getAllQuotes, getQuoteByWeight} = require("../Controllers/QuoteController");

const router = require("express").Router();

router.post("/createQuote", createQuote);
router.get("/getAllQuotes", getAllQuotes);
router.get("/getQuoteByWeight", getQuoteByWeight);

module.exports = router;