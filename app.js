const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api");
const {
  routeNotFound,
  handle500,
  handleCustomErrors,
  handleSQLErrors
} = require("./errors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);

app.use(handleSQLErrors);

app.all("/*", routeNotFound);

app.use(handle500);

module.exports = app;
