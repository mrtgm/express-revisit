const router = require("express").Router();
const usersController = require("../controllers/usersController");
const middleware = require("../middleware");
const passport = require("passport");
const { body } = require("express-validator");

router.get("/", usersController.index);

router.get("/my", middleware.checkAuthentication, (req, res) => {
  return res.status(200).json(req.user);
});

// /users/:id と勘違いされないように上に書く
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.login(user, (err) => {
      //serializeUserを呼び出し、セッションにユーザー情報を保存してセッション確立
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/logout", middleware.checkAuthentication, usersController.logout);

router.post(
  "/create",
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

router.get("/:id", usersController.show);
router.put("/:id/update", usersController.update);
router.delete("/:id/delete", usersController.delete);

module.exports = router;
