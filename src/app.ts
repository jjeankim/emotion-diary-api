import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import diaryRouter from "./routes/diaryRouter";
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to DB"));
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000","https://emotion-diary-jjeankim.netlify.app"],
};

app.use(cors(corsOptions));
//req바디를 json객체로 변환
app.use(express.json());

app.use("/diary", diaryRouter);

app.listen(process.env.PORT || 4000, () => console.log("Server Started!"));
