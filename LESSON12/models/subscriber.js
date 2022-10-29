const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // [] で囲むとコースとユーザは多対多の関係、囲まないと一対多の関係
});

//スキーマのインスタンスにメソッドを生やせる

subscriberSchema.methods = {
  getInfo() {
    return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
  },
  findLocalSubscribers() {
    return this.model("Subscriber").find({ zipCode: this.zipCode }).exec(); //this.model("モデル名")でモデル取れる
  },
};

module.exports = mongoose.model("Subscriber", subscriberSchema); //model(モデル名、スキーマ)
