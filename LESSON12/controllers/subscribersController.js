const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");
const httpStatus = require("http-status-codes");

exports.getAllSubscribers = async (req, res, next) => {
  try {
    const result = await Subscriber.find({});
    req.data = result;
    next();
  } catch (e) {
    next(e);
  }
};

exports.getSubscriberPage = async (req, res, next) => {
  res.send(req.data);
};

exports.saveSubscriber = (req, res, next) => {
  const newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
  });
  newSubscriber.save((e, result) => {
    if (e) next(e);
    res.send(result);
  });
};
