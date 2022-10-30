const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");
const httpStatus = require("http-status-codes");

module.exports = {
  index: async (req, res, next) => {
    try {
      const result = await Subscriber.find({});
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  },
  create: (req, res, next) => {
    const newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode,
    });
    newSubscriber.save((e, result) => {
      if (e) next(e);
      res.status(200).json(result);
    });
  },
  show: async (req, res, next) => {
    try {
      const result = await Subscriber.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await Subscriber.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const result = await Subscriber.findByIdAndRemove(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  },
};
