const { Signup, Login ,getAllUsers} = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/Authmiddleware");
const {createShipment} = require("../Controllers/ShipmentController");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify",userVerification);
router.get("/users", getAllUsers);
router.post("/createShip",createShipment);

module.exports = router;
