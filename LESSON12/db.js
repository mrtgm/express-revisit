// 作成したモデルを使い、データベースからクエリする
const Subscriber = require("./models/subscriber");

const search = async () => {
  //   const result = await Subscriber.findOne({ name: "Jon Wexler" }).where("email", /hoge/);
  const myQuery = Subscriber.findOne({ name: "Jon Wexler" }).where("email", /hoge/);
  const result = await myQuery.exec();
  console.log(result);
};

search();

// モデルの作成とDBへの追加 new と create の二つ

const subscriber1 = new Subscriber({
  name: "Jon Wexler",
  email: "jon@hoge.com",
});

subscriber1.save((e, savedDoc) => {
  if (e) console.log(e);
  console.log(savedDoc);
});

const bulk = async () => {
  const result = await Subscriber.create({
    name: "太郎田中",
    email: "taro@hoge.com",
  });
  console.log(result);
};

bulk();
