const User = require("../models/users.js");
const { validationResult } = require("express-validator");
const passport = require("passport");

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = errors.array().map((e) => `${e.param} is ${e.msg}`);
      return res.status(400).json({ message: messages.join(" and ") }); //ちゃんと return する
    }

    try {
      const user = new User(req.body);
      const result = await user.save();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  },
  show: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json(user);
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
  my: async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },
  logout: async (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.status(200).json({ message: "Logout Successfully" });
  },
};
