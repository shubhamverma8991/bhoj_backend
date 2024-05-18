const {createQuote, getAllQuotes, getPriceByWeight} = require("../Controllers/QuoteController");

const router = require("express").Router();

router.post("/createQuote", createQuote);
router.get("/getAllQuotes", getAllQuotes);
router.get("/getPriceByWeight", getPriceByWeight);

module.exports = router;