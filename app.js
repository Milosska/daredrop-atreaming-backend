const express = require("express");
const cors = require("cors");
const { rootRouter } = require("./routes");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { notFoundHandler } = require("./middlewares/notFoundHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", rootRouter);

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = {
  app,
};
