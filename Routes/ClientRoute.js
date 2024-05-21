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
// Route to get a client by clientId
router.get("/getClientByClientId", getClientByClientId);

// Route to update a client by clientId
router.put("/updateClientByClientId", updateClientByClientId);

// Route to delete a client by clientId
router.delete("/deleteClientByClientId", deleteClientByClientId);

// Route to search clients by name
router.get("/clients/search", searchClientByName);

module.exports = router;
