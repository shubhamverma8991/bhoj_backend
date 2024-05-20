const {
  createClient,
  getAllClients,
} = require("../Controllers/ClientController");

const router = require("express").Router();

router.post("/createClient", createClient);
router.get("/getAllClients", getAllClients);

module.exports = router;
