const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const randToken = require("rand-token");

const Subscriber = require("./subscriber");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      first: { type: String, trim: true },
      last: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      unique: true,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
  },
  {
    timestamps: true,
  }
);

userSchema.methods = {
  //モデルにパスワード比較用のメソッドを定義
  comparePassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
};

//スキーマのインスタンスに算出属性を加える、EJS から参照できる（不要？）
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  let user = this;

  const generateRandToken = () => {
    return new Promise((resolve, reject) => {
      user.token = randToken.generate(16);
      resolve(user.token);
    });
  };

  const hashPassword = () => {
    //   保存されたら bcrypt でパスワードをハッシュ化する
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const registerSubscriber = () => {
    //保存されたら subscribedAccount に、同じメアドの購読者を紐づける
    if (user.subscribedAccount === undefined) {
      return Subscriber.findOne({
        email: user.email,
      })
        .then((subscriber) => {
          user.subscribedAccount = subscriber;
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      //既に既存の関連があれば何もしない
      return;
    }
  };

  //パスワードをハッシュ化してから、購読者を紐づける
  hashPassword()
    .then(() => registerSubscriber())
    .then(() => generateRandToken())
    .then(() => next())
    .catch((error) => next(error));
});

module.exports = mongoose.model("User", userSchema);
