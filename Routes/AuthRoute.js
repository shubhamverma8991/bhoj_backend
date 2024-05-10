const { Signup, Login ,getAllUsers} = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/Authmiddleware");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify",userVerification);
router.get("/users", getAllUsers);

module.exports = router;
