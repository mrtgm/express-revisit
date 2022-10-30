const User = require("../models/users.js");

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  },
  show: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },
};
