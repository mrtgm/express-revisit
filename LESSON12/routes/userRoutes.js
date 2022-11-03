const router = require("express").Router();
const usersController = require("../controllers/usersController");
const middleware = require("../middleware");
const passport = require("passport");
const { body } = require("express-validator");

router.get("/", usersController.index);

router.get("/my", middleware.checkAuthentication, usersController.my);

// /users/:id と勘違いされないように上に書く
router.post("/login", usersController.login);
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
