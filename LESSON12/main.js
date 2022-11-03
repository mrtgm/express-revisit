const mongoose = require("mongoose");

const middleware = require("./middleware");
const layouts = require("express-ejs-layouts");
const cors = require("cors");
const express = require("express");
const router = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/recipe_db", { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

// 開発環境のCORS対策
if (process.env.NODE_ENV !== "production") {
  const allowedOrigins = ["http://localhost:8080"];

  const options = {
    origin: allowedOrigins, // Access-Control-Allow-Origin
    credentials: true, // Access-Control-Allow-Credentials
  };

  //preflight request 周り（Method, option メソッドへの応答)は cors モジュールがやってくれてる

  app.use(cors(options));
}

app.use(middleware.logger);

app.use(express.static("public"));
app.use(layouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./passport")(app);

app.use("/", router);

app.listen(app.get("port"), () => console.log("server running on port 3000"));
