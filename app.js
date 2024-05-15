const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const shipRoute = require("./Routes/ShipRoute");
const quoteRoute = require("./Routes/QuoteRoute");
const { MONGO_URL } = process.env;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port" ,PORT);
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
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use("/", shipRoute);
app.use("/", quoteRoute);

app.get("/test", (req, res) => {
  res.status(200).send("GET request to the homepage successful");
});

module.exports.handler = serverless(app);
