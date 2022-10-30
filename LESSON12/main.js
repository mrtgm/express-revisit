const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const cors = require("cors");
const express = require("express");

const app = express();
const router = express.Router();

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

app.use("/", router);

app.use(express.static("public"));
app.use(layouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/subscribers", subscribersController.index);
router.get("/subscribers/:id", subscribersController.show);
router.post("/subscribers/create", subscribersController.create);

router.get("/users", usersController.index);
router.get("/users/:id", usersController.show);
router.put("/users/:id/update", usersController.update);
router.delete("/users/:id/delete", usersController.delete);
router.post("/users/create", usersController.create);

router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showSignUp);
router.post("/contact", homeController.postedSignUpForm);

router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.listen(app.get("port"), () => console.log("server running on port 3000"));
