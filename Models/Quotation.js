const mongoose = require("mongoose");

const quotaionSchema = new mongoose.Schema({
   weight: {
    type: String,
    required: true
   },
   withinCity:{
    type: String,
    required: true
   },
   allCG:{
    type: String,
    required: true
   },
   allIndia:{
    type: String,
    required: true
   }
});

module.exports = mongoose.model("Quotation", quotaionSchema);