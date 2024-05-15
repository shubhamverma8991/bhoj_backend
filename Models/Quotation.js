const mongoose = require("mongoose");

const quotaionSchema = new mongoose.Schema({
   weight: {
    type: String,
    required: true
   },
   withinCity:{
    type: Number,
    required: true
   },
   allCG:{
    type: Number,
    required: true
   },
   allIndia:{
    type: Number,
    required: true
   }
});

module.exports = mongoose.model("Quotation", quotaionSchema);