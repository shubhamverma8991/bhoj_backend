const {createShipment, getAllShipments, getShipByTrackingId} = require("../Controllers/ShipController");

const router = require("express").Router();

router.post("/createShip",createShipment);
router.get("/getAllShipments",getAllShipments);
router.get("/getShipByTrackingId",getShipByTrackingId);

module.exports = router;
