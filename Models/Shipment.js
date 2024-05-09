const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({

});
{
    "shipper": {
        "name": "Shubham Verma",
        "email": "ssv8991@gmail.com",
        "phonenumber": 8962663656,
        "shipperAddress": {
            "street": "St21-A Plot 457/32 Ashish Nagar West Risali",
            "city": "Bhilai",
            "state": "Chhattisgarh"
        }
    },
    "receiver": {
        "name": "Keshar Verma",
        "email": "shubhamv2010@gmail.com",
        "phonenumber": 8962663656,
        "receiverAddress": {
            "street": "St21A Plot 457/32 Ashish Nagar West",
            "city": "Bhilai",
            "state": "Chhattisgarh"
        }
    },
    "parceltype": "document",
    "quantity": 12,
    "rate": 5.5,
    "finalamount": 66.0,
    "bookingdate": "2024-05-08",
    "estdeliverydate": "2024-05-31",
    "empid": "BHI-3"
}