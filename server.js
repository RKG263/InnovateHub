import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookie from "cookie-parser";
// files
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js"
import errorHandler from "./middleware/errorMiddleware.js";
import othersRoute from "./routes/othersRoute.js";
import cloudinary from 'cloudinary'

import entrepreneurRoute from "./routes/entrepreneurRoute.js";
import mentorRoute from "./routes/mentorRoute.js";
import investorRoute from "./routes/investorRoute.js";
import aiChatRoute from "./routes/aiChatRoute.js";
import chatRoute from "./routes/chatRoute.js"
import messageRoute from "./routes/messageRoute.js"
import mentorPlanRoute from './routes/mentorPlanRoute.js'

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin : true,
  credentials : true,
  methods : ["GET" , 'POST' , "PUT" , "DELETE"],       
}));
app.use(morgan("dev"));
app.use(cookie());
cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_SECRET
})

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment",commentRoute);
app.use("/api/v1/entrepreneur", entrepreneurRoute);
app.use("/api/v1/mentor", mentorRoute);
app.use("/api/v1/investor", investorRoute);
app.use("/api/v1/other", othersRoute);
app.use("/api/v1/ai/",aiChatRoute)
app.use('/api/v1/chat', chatRoute)
app.use('/api/v1/message', messageRoute)
app.use('/api/v1/mentorPlan',mentorPlanRoute)

app.get("/", (req, res) => {
  res.send("i am sending your request ");
});
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is listening on port  carefully", PORT);
});
