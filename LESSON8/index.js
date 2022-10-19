const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");

app.use((req, res, next) => {
  console.log("In the middleware!");
  next(); //useミドルウェアからルータ関数に処理を渡す
});

// Stream で送られてくる POST データを req.body で受け取るために、デコードが必要
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use("/items", (req, res, next) => {
  console.log("In another middleware!");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Universe");
});

app.post("/contact", (req, res) => {
  console.log(req.body); // POST されたデータを受け取る
  console.log(req.query); // クエリ文字列を受け取る
  res.send("Thanks for contacting us!");
});

app.get("/items/:vegetable", (req, res) => {
  res.send(req.params.vegetable);
});

app.listen(port, () => {
  console.log(`The server has started and is listening on port number: ${port}`);
});
