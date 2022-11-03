const cors = require("cors");
const Users = require("../models/users");

module.exports = {
  logger: (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  },
  checkAuthentication: (req, res, next) => {
    if (req.isAuthenticated()) {
      //passport が提供するログイン判定用の関数
      next();
    } else {
      res.status(401).json("Not Authenticated");
    }
  },
  verifyToken: async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      try {
        const user = await Users.findOne({ token: bearerToken });
        if (!user) {
          return res.status(401).json("Invalid Token");
        }
        next();
      } catch (e) {
        next(e);
      }
    } else {
      res.status(403).json("Forbidden");
      next();
    }
  },
};
