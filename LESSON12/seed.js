const mongoose = require("mongoose");
const courses = require("./models/courses");
const Subscriber = require("./models/subscriber");
const Course = require("./models/courses");
const User = require("./models/users");

mongoose.connect("mongodb://localhost:27017/recipe_db", { useNewUrlParser: true });

const db = mongoose.connection;

const contacts = [
  {
    name: "Jon Wexler",
    email: "my@my.com",
    zipCode: 10016,
  },
  {
    name: "Chef Eggplant",
    email: "aaa@a.com",
    zipCode: 20331,
  },
  {
    name: "Professor Souffle",
    email: "hoa@a.com",
    zipCode: 19103,
  },
];

const createSubscriber = () => {
  const commands = [];
  contacts.forEach((c) => {
    commands.push(Subscriber.create({ name: c.name, email: c.email, zipCode: c.zipCode }));
  });
  return Promise.all(commands).then((r) => {
    console.log(JSON.stringify(r));
  });
};

const showLogs = () => {
  //スキーマに生やしたインスタンスメソッド（getInfo）でログを出力する
  return Subscriber.findOne({
    name: "Jon Wexler",
  }).then((r) => {
    if (r) {
      console.log(r.getInfo());
    }
  });
};

const createCourse = () => {
  //Scheme.populate を使い、関連するコレクションのデータを取得する

  let testCourse, testSubscriber;

  return Course.deleteMany({})
    .then(() =>
      //コースのコレクションを新規に作り、そのインスタンスを変数に代入
      Course.create({
        title: "Tomato Land",
        description: "Locally farmed tomatoes only",
        items: ["cherry", "heirloom"],
      })
    )
    .then((course) => (testCourse = course))
    .then(() =>
      //購読者を一件取得
      Subscriber.findOne({})
    )
    .then((subscriber) => {
      testSubscriber = subscriber;
    })
    .then(() => {
      //購読者のコースに、コースのobjectIdを入れる
      testSubscriber.courses.push(testCourse._id);
      testSubscriber.save();

      //コースと購読者を紐づける
      Subscriber.populate(testSubscriber, "courses").then((subscriber) => console.log(subscriber));
    })
    .then(() => {
      //購読者をコースのIDでクエリ
      const target = Subscriber.find({ courses: mongoose.Types.ObjectId(testCourse._id) });
      console.log(target);
    });
};

const createUser = () => {
  let testUser;
  return User.deleteMany({})
    .then(() =>
      User.create({
        name: {
          first: "Jon",
          last: "Wexler",
        },
        email: "my@my.com",
        password: "password",
      })
    )
    .then((user) => {
      testUser = user;
      return Subscriber.findOne({ email: user.email });
    })
    .then((subscriber) => {
      ///メアドでユーザと購読者を紐付けて保存
      testUser.subscribedAccount = subscriber;
      return testUser.save().then((user) => console.log(user));
    })
    .catch((e) => console.log(e.message));
};

//全件削除した後コマンドを実行
Subscriber.deleteMany({})
  .then(() => console.log("delete all subscribers"))
  .then(createSubscriber)
  .then(showLogs)
  .then(createCourse)
  .then(createUser)
  .catch((e) => console.log(e))
  .finally(() => db.close());
