const mongoose = require("mongoose");
const Subscriber = require("./subscriber");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      first: { type: String, required: true },
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
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
  },
  {
    timestamps: true,
  }
);

//スキーマのインスタンスに算出属性を加える、EJS から参照できる（不要？）
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

//保存されたら subscribedAccount に、同じメアドの購読者を紐づける
userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    //既に既存の関連があれば何もしない
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
