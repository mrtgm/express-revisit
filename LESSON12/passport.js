const passport = require("passport");
const expressSession = require("express-session");

const User = require("./models/users");
const LocalStrategy = require("passport-local");

module.exports = function (app) {
  //ユーザ情報をセッションに保存
  passport.serializeUser(function (user, done) {
    console.log("serializeUser", user);
    done(null, user.id);
  });

  //セッションに保存されたIDからユーザを特定し、リクエスト時に req.user にセットする
  passport.deserializeUser(async function (id, done) {
    console.log("deserializeUser", id);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        User.findOne({ email: username })
          .then((user) => {
            console.log("i found!", user);

            if (!user) {
              return done(null, false, { message: "Incorrect username." });
            } else if (!user.comparePassword(password)) {
              return done(null, false, { message: "Incorrect password." });
            } else {
              return done(null, user);
            }
          })
          .catch((e) => {
            console.error(e);
            return done(null, false, { message: e.toString() });
          });
      }
    )
  );

  app.use(
    expressSession({
      secret: "secret_passcode", //セッションIDを保存するCookieの署名に使う、署名付きCookieは Cookieが改竄されてないことの証明になる
      cookie: {
        maxAge: 4000000,
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());

  app.use(passport.session());
};
