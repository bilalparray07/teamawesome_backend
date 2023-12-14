///entry level server.js

const express = require("express");
const server = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
server.use(function (req, res, next) {
  // Allow all origins for general requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // Check for the specific route and allow the specific origin
  if (req.url.startsWith('/api/players/')) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  }

  // Allow preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//// mongo url ///connection string
const MONGO_DB_URI =
  "mongodb+srv://sorieasal:xb1ANl8yyAjecDeY@nodejs.3k8ji4v.mongodb.net/teamawesomesozeith";

///json use
server.use(bodyParser.json());
// router use
server.use(routes);
//cors use
server.use(cors);
// Serve static files from the 'public' directory
server.use(express.static("public"));
///database connection

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("Connected to Atlas DB");
  })
  .catch(() => {
    console.log("Failed to Connect to Atlas Db");
  });

///server listening
server.listen(port, () => {
  console.log("Server Listening" + `on ${port}`);
});
