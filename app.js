import express from "express";
import diaryList from "./data/mock.js";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import Diary from "./models/Diary.js";


mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'))
const app = express();

//req바디를 json객체로 변환
app.use(express.json());

//find() DB data 모두 가져오기
app.get("/diary", async (req, res) => {
  const diary = await Diary.find()
  res.send(diary);
});

//findById() DB data에서 해당 id data만 가져오기
app.get("/diary/:id", async (req, res) => {
  const id = req.params.id;
  const diaryItem = await Diary.findById(id)
  if(diaryItem) res.send(diaryItem)
});

const getNextId = (arr) => {
  const ids = arr.map((el) => el.id);
  return Math.max(...ids) + 1;
};

//create()새로 생성하기
app.post("/diary", async (req, res) => {
  const newDiary = await Diary.create(req.body)
  res.status(201).send(newDiary)
});

//
app.patch("/diary/:id", (req, res) => {
  const id = req.params.id;
  const diaryItem = diaryList.find((diary) => diary.id === id);
  if (diaryItem) {
    Object.keys(req.body).forEach((key) => {
      diaryItem[key] = req.body[key];
    });
    diaryItem.updatedAt = new Date();
    res.send(diaryItem);
  } else {
    res.status(404).send({ "message": "Cannot find given id" });
  }
});

app.delete("/diary/:id",(req,res) => {
  const id = req.params.id
  const idx = diaryList.findIndex(item => item.id === id)
  if (idx >= 0) {
    diaryList.splice(idx, 1)
    res.sendStatus(204)
  } else {
    res.status(404).send({"message": "Cannot find given id."})
  }
})

app.listen(4000, () => console.log("Server Started!"));
