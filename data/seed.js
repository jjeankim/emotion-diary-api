import mongoose from "mongoose";
import diaryList from "./mock.js";
import Diary from "../models/Diary.js";
import * as dotenv from "dotenv";
dotenv.config()

mongoose.connect(process.env.DATABASE_URL);

await Diary.deleteMany({});
await Diary.insertMany(diaryList);

mongoose.connection.close();
