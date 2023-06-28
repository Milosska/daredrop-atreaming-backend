const { isValidObjectId } = require("mongoose");
const { HttpError } = require("./HttpError");

const isValidId = (req, res, next) => {
  const { streamerId } = req.params;
  isValidObjectId(streamerId)
    ? next()
    : next(new HttpError(400, `${streamerId} is not valid id`));
};

module.exports = { isValidId };
