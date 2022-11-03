const passport = require("passport");
const expressSession = require("express-session");

const User = require("./models/users");
const LocalStrategy = require("passport-local");

module.exports = function (app) {
  //ユーザ情報をセッションに保存
  passport.serializeUser(function (user, done) {
    console.log("serializeUser", user);
    done(null, user.id); //user.idをセッションに保存
  });

  //セッションに保存されたIDからユーザを特定し、リクエスト時に req.user にセットする
  passport.deserializeUser(async function (id, done) {
    // id は serializeUser でセットした user.id
    console.log("deserializeUser", id);
    try {
      const user = await User.findById(id);
      done(null, user); //req.user にセットされる
    } catch (e) {
      done(e, null);
    }
  });

  //ユーザ認証のロジックを記述
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        User.findOne({ email: username })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect username." });
            } else if (!user.comparePassword(password)) {
              return done(null, false, { message: "Incorrect password." });
            } else {
              return done(null, user); //req.user にセットされる
            }
          })
          .catch((e) => {
            console.error(e);
            return done(null, false, { message: e.toString() });
          });
      }
    )
  );

  //ExpressSession は Cookie にセッションIDを保存する
  //req.session でセッションデータにアクセスできる
  //passport.session は内部で ExpressSession が生やした req.session にセッションIDを保存するもの

  app.use(
    expressSession({
      secret: "secret_passcode", //セッションIDを保存するCookieの署名に使う、署名付きCookieは Cookieが改竄されてないことの証明になる
      cookie: {
        httpOnly: true, // default
        maxAge: 4000000,
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());

  app.use(passport.session());
};
