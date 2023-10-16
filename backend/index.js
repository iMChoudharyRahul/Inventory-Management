const express = require("express");
require("./connection/db/config");
const bodyParser = require("body-parser");
const Api = require("./controller/main");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());
app.use("/api/v1", Api);

//----->Middleware for reading user data
app.use(bodyParser.json()); // --->parse application/json -->
// --->parse application/x-www-form-urlencoded-->
app.use(bodyParser.urlencoded({ extends: false }));

/**
 * Page Not Found
 */
app.all("*", (req, res) => {
  res.send("<h1>404</h1> <h3>Page Not Found </h3>");
});

app.listen(PORT, () => {
  console.log(`Server Start at Port: ${PORT}`);
});
