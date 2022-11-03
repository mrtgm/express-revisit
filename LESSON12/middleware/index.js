const cors = require("cors");

module.exports = {
  logger: (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  },
};
