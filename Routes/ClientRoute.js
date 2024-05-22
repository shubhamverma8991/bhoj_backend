const {
  createClient,
  getAllClients,
  searchClientByName,
  deleteClientByClientId,
  updateClientByClientId,
  getClientByClientId,

} = require("../Controllers/ClientController");

const router = require("express").Router();

router.post("/createClient", createClient);
router.get("/getAllClients", getAllClients);
router.get("/getClientByClientId", getClientByClientId);
router.put("/updateClientByClientId", updateClientByClientId);
router.delete("/deleteClientByClientId", deleteClientByClientId);
router.get("/searchClientByName", searchClientByName);

module.exports = router;
