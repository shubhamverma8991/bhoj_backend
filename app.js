const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
const https = require("https");
const fs = require("fs");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const shipRoute = require("./Routes/ShipRoute");
const quoteRoute = require("./Routes/QuoteRoute");
const clientRoute = require("./Routes/ClientRoute");
const { MONGO_URL } = process.env;

const app = express();

const sslOptions = {
  key: fs.readFileSync('cert/server.key'),
  cert: fs.readFileSync('cert/server.cert')
};
const PORT = process.env.PORT || 3000;

// Start the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log("HTTPS Server running on port", PORT);
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const sslServer = https.createServer(
  {
  key:'',
  cert:''
  }
, app)
sslServer.listen(3443, () => console.log('Secure server on port 3443'))
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use("/", shipRoute);
app.use("/", quoteRoute);
app.use("/", clientRoute);

app.get("/test", (res) => {
  res.status(200).send("GET request to the homepage successful");
});

module.exports.handler = serverless(app);
