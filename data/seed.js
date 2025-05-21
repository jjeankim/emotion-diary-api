import mongoose from "mongoose";
import diaryList from "./mock.js";
import { DATABASE_URL } from "../env.js"
import Diary from "../models/Diary.js";

mongoose.connect(DATABASE_URL);

await Diary.deleteMany({});
await Diary.insertMany(diaryList);

mongoose.connection.close();
