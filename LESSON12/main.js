const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const cors = require("cors");
const express = require("express");

const app = express();

mongoose.connect("mongodb://localhost:27017/recipe_db", { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

// 開発環境のCORS対策
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.static("public"));
app.use(layouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/subscribers", subscribersController.getAllSubscribers, subscribersController.getSubscriberPage);

app.post("/subscribers", subscribersController.saveSubscriber);

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => console.log("server running on port 3000"));
