const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res, next) => {
  const errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode).json("Resource not found!");
};

exports.respondInternalError = (error, req, res, next) => {
  const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode).json({ message: error.message });
};
