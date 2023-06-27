const globalErrorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Something went wrong. Please, try again later",
  });
};

module.exports = {
  globalErrorHandler,
};
