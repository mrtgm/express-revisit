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

//モデルクラスのインスタンスにメソッド、静的メソッドを生やせる
subscriberSchema.methods = {
  getInfo() {
    return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
  },
  findLocalSubscribers() {
    return this.model("Subscriber").find({ zipCode: this.zipCode }).exec();
    //this.model("モデル名")は mongoose.model("モデル名") と同じこと、モデルクラス本体にアクセスできる
  },
};

//mongoose.model でスキーマからモデルクラスを定義する
//第一引数はモデルの名前を大文字で（これの lowercase, 複数形がコレクションの名前となる）、第二引数にスキーマ定義
module.exports = mongoose.model("Subscriber", subscriberSchema);

//-----------流れ----------------

//1. モデルの定義
//  const hogeSchema = mongoose.Schema({ name: String, age: Number });
//  const Hoge = mongoose.model("Hoge", hogeSchema);
//2. モデルのインスタンスを作成
//  const hoge = new Hoge({ name: "hoge", age: 20 });
//3. DBへの保存
//  hoge.save((e, result) => { ... });
