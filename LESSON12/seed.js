const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipe_db", { useNewUrlParser: true });

const db = mongoose.connection;

const contacts = [
  {
    name: "Jon Wexler",
    email: "a@a.com",
    zipCode: 10016,
  },
  {
    name: "Chef Eggplant",
    email: "aa@a.com",
    zipCode: 20331,
  },
  {
    name: "Professor Souffle",
    email: "hoa@a.com",
    zipCode: 19103,
  },
];

Subscriber.deleteMany().then(() => console.log("delete all subscribers"));

const commands = [];

contacts.forEach((c) => {
  commands.push(Subscriber.create({ name: c.name, email: c.email, zipCode: c.zipCode }));
});

Promise.all(commands)
  .then((r) => {
    console.log(JSON.stringify(r));
  })
  .then(() =>
    // スキーマのメソッド
    Subscriber.findOne({
      name: "Jon Wexler",
    })
  )
  .then((r) => {
    console.log(r.model("Subscriber").find({}).exec());
    if (r) {
      console.log(r.getInfo());
    }
    db.close();
  })
  .catch((e) => console.log(e));
