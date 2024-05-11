const {createShipment, getAllShipments, getShipById} = require("../Controllers/ShipController");

const router = require("express").Router();

router.post("/createShip",createShipment);
router.get("/getAllShipments",getAllShipments);
router.get("./getShipById",getShipById);

module.exports = router;
