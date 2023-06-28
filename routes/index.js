const { Router } = require("express");
const { streamersRouter } = require("./streamersRouter");

const router = Router();

router.use("/api/streamers", streamersRouter);

module.exports = {
  rootRouter: router,
};
