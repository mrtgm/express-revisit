const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  fs = require("fs");

const routeResponseMap = {
  "/": "views/index.html",
  "/info": "views/index.html",
};

const getViewUrl = (url) => `views${url}.html`;

const app = http.createServer((req, res) => {
  //ユーザがリクエストするたびに、このコールバックが実行される

  const viewUrl = getViewUrl(req.url);

  if (routeResponseMap[req.url]) {
    fs.readFile(routeResponseMap[req.url], (err, data) => {
      if (err) {
        res.writeHead(httpStatus.NOT_FOUND);
        res.write("<h1>FILE NOT FOUND</h1>");
      } else {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/html",
        });
        res.write(data);
      }
      res.end();
    });
    // res.end(routeResponseMap[req.url]);
  } else {
    res.end("<h1>Welcome!</h1>");
  }
  //   console.log(`Sent a response : ${responseMessage}`);
});

//Node.js では, POST された Data は Stream で受け取る

app.on("requset", (req, res) => {
  const body = [];
  req.on("data", (bodyData) => {
    body.push(bodyData);
  });

  req.on("end", () => {
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body}`);
  });

  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html",
  });

  const responseMessage = "<h1>This will show on the screen.</h1>";
  res.end(responseMessage);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
