const port = 3000;
const http = require("http");
const layouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");

// app.set で環境変数
app.set("view engine", "ejs");
app.set("port", port);

//静的ファイルを配信
app.use(express.static("public"));

app.use(layouts);

app.get("/", homeController.respondWithName);

app.get("/name/:myName", homeController.respondWithName);

// エラー処理は必ず末尾に
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port);
