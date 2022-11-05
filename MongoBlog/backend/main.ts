import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "~/routes";
import { logger } from "~/middleware";

const app: express.Express = express();

mongoose.connect(process.env.MONGO_DB_URI as string);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
if (process.env.NODE_ENV !== "production") {
  const corsOptions = {
    origin: "http://localhost:8080",
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Routes
app.use("/", routes);

// Debug
app.use(logger);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
