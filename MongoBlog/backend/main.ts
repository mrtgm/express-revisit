import express from "express";
import cors from "cors";

const app: express.Express = express();

app.set("port", 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS

if (process.env.NODE_ENV !== "production") {
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
