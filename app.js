import express from "express";
import mongoose from "mongoose";
import Diary from "./models/Diary.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import * as dotenv from 'dotenv';
dotenv.config()


mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected to DB"));
const app = express();

//req바디를 json객체로 변환
app.use(express.json());

//find() DB data 모두 가져오기
app.get(
  "/diary",
  asyncHandler(async (req, res) => {
    const diary = await Diary.find();
    res.send(diary);
  })
);

//findById() DB data에서 해당 id data만 가져오기
app.get(
  "/diary/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const diaryItem = await Diary.findById(id);
    if (diaryItem) res.send(diaryItem);
  })
);

const getNextId = (arr) => {
  const ids = arr.map((el) => el.id);
  return Math.max(...ids) + 1;
};

//create()새로 생성하기
app.post(
  "/diary",
  asyncHandler(async (req, res) => {
    const newDiary = await Diary.create(req.body);
    res.status(201).send(newDiary);
  })
);

//findById()와 save()메소드를 사용해서 찾고, 저장해야 유효성 검사 가능능
app.patch(
  "/diary/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const diaryItem = await Diary.findById(id);
    if (diaryItem) {
      Object.keys(req.body).forEach((key) => {
        diaryItem[key] = req.body[key];
      });
      await diaryItem.save();
      res.send(diaryItem);
    } else {
      res.status(404).send({ message: "Cannot find given id" });
    }
  })
);

app.delete(
  "/diary/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const diaryItem = await Diary.findByIdAndDelete(id);
    if (diaryItem) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.listen(process.env.PORT || 4000, () => console.log("Server Started!"));
