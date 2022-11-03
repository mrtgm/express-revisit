const mongoose = require("mongoose");

const { body } = require("express-validator");
const passport = require("passport");
const User = require("./models/users");
const subscribersController = require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const homeController = require("./controllers/homeController");
const middleware = require("./middleware");
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

app.use("/", router);

// 開発環境のCORS対策
if (process.env.NODE_ENV !== "production") {
  const allowedOrigins = ["http://localhost:8080"];

  const options = {
    origin: allowedOrigins, // Access-Control-Allow-Origin
    credentials: true, // Access-Control-Allow-Credentials
  };

  //疑問：Access-Control-Request-Headers, Access-Control-Request-Method は不要？
  //疑問：preflight request は不要？

  router.use(cors(options));
}

router.use(middleware.logger);

router.use(express.static("public"));
router.use(layouts);

//router.use(cookieParser("secret_passcode"));

//ExpressSession は Cookie にセッションIDを保存し、セッションデータはサーバー側に保存する
//req.session でセッションデータにアクセスできる

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

require("./passport")(router);

//最後にログインしたユーザのデータを Cookie に保存、サーバはセッション開始時にそのデータを比較して認証
//req.user に入ってくるようになる
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser()); //ブラウザ用に暗号化
// passport.deserializeUser(User.deserializeUser()); //ブラウザから複合

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/subscribers", subscribersController.index);
router.get("/subscribers/:id", subscribersController.show);
router.put("/subscribers/:id/update", subscribersController.update);
router.delete("/subscribers/:id/delete", subscribersController.delete);
router.post("/subscribers/create", subscribersController.create);

router.get("/users", usersController.index);

router.get("/users/my", checkAuthentication, (req, res) => {
  return res.status(200).json(req.user);
});

function checkAuthentication(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(204).send();
  }
}

// /users/:id と勘違いされないように上に書く
router.post("/users/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/users/logout", usersController.logout);
router.post(
  "/users/create",
  //正規化とバリデーション
  [
    body("email")
      .isEmail()
      .normalizeEmail({
        gmail_remove_dots: false,
        all_lowercase: true,
      })
      .trim(),
    body("zipCode").notEmpty().isInt().isLength({
      min: 5,
      max: 5,
    }),
    body("password").notEmpty(),
  ],
  usersController.create
);
router.get("/users/:id", usersController.show);
router.put("/users/:id/update", usersController.update);
router.delete("/users/:id/delete", usersController.delete);

router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showSignUp);
router.post("/contact", homeController.postedSignUpForm);

router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.listen(app.get("port"), () => console.log("server running on port 3000"));
