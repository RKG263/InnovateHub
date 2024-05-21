import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// files
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

connectDB();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("i am sending your request ");
});

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log("server is listning");
});
