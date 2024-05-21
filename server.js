import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookie from 'cookie-parser'
// files
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";

import errorHandler from "./middleware/errorMiddleware.js";
const app = express();

dotenv.config();

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookie());

app.use("/api/v1/auth", authRoute);
app.get("/", (req, res) => {
  res.send("i am sending your request");
});
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});
