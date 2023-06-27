const { Router } = require("express");
const { streamersRouter } = require("./streamersRouter");

const router = Router();

router.use("/streamers", streamersRouter);

module.exports = {
  rootRouter: router,
};
