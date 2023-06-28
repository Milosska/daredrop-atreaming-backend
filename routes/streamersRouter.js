const express = require("express");
const { validateBody } = require("../utils/validateBody");
const { isValidId } = require("../utils/isValidId");
const { fileUpload } = require("../utils/fileUpload");
const {
  CreateStreamerSchema,
} = require("../utils/validation/streamersValidationSchemas");
const {
  getStreamersController,
  createStreamerController,
  getStreamerByIdController,
  updateStreamerVote,
} = require("../controllers/streamersControllers");

const router = express.Router();

router
  .route("/")
  .get(getStreamersController)
  .post(
    fileUpload.single("photo"),
    validateBody(CreateStreamerSchema),
    createStreamerController
  );

router.route("/:streamerId").get(isValidId, getStreamerByIdController);

router.route("/:streamerId/vote").put(isValidId, updateStreamerVote);

module.exports = {
  streamersRouter: router,
};
