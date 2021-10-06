const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const globalHelpers = require("./utils/globalhelpers");

const app = express();
// Create Express app
app.use(cors());

// Body middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

require("./config/db");
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", require("./routes"));

// Global error handler
app.use((err, _, res, _a) => {
  const error = globalHelpers.handleMongooseError(err.message);
  res.status(err.status || 400).json({ ...error, success: false });
});

// define Port
const port = process.env.PORT || 5000;

// port listen
app.listen(port, () => console.log(`Server started on port ${port}`));
