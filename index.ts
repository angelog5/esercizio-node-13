import express from "express";
import morgan from "morgan";
import "express-async-errors";
import { config } from "dotenv";
import path from "path";
import pgPromise from "pg-promise";

import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets";

config();

const pgp = pgPromise();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: "planets_db",
  user: "your_username",
  password: "your_password",
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);
app.post("/api/planets", create);
app.put("/api/planets/:id", updateById);
app.delete("/api/planets/:id", deleteById);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
