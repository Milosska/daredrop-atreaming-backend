const express = require("express");
const cors = require("cors");

const { rootRouter } = require("./routes");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { notFoundHandler } = require("./middlewares/notFoundHandler");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", rootRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = {
  app,
};
