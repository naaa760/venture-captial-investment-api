const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};
