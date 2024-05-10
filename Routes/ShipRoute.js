const {createShipment, getAllShipments} = require("../Controllers/ShipController");

const router = require("express").Router();

router.post("/createShip",createShipment);
router.get("/getAllShipments",getAllShipments);

module.exports = router;
