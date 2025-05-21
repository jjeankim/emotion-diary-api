import express from "express";
import diaryList from "./mock.js";
import mongoose from "mongoose";


mongoose.connect(DATABASE_BASE).then(() => console.log('Connected to DB'))
const app = express();

//req바디를 json객체로 변환
app.use(express.json());

app.get("/diary", (req, res) => {
  res.send(diaryList);
});

app.get("/diary/:id", (req, res) => {
  const id = Number(req.params.id);
  const diaryItem = diaryList.find((diary) => diary.id === id);
  if (diaryItem) res.send(diaryItem);
  else {
    res.status(404).send({ message: "Cannot find given id." });
  }
});

const getNextId = (arr) => {
  const ids = arr.map((el) => el.id);
  return Math.max(...ids) + 1;
};

app.post("/diary", (req, res) => {
  const newDiary = req.body;
  newDiary.id = getNextId(diaryList);
  newDiary.createdAt = new Date();
  newDiary.updatedAt = new Date();
  diaryList.push(newDiary);
  res.status(201).send(newDiary);
});

app.patch("/diary/:id", (req, res) => {
  const id = Number(req.params.id);
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
  const id = Number(req.params.id)
  const idx = diaryList.findIndex(item => item.id === id)
  if (idx >= 0) {
    diaryList.splice(idx, 1)
    res.sendStatus(204)
  } else {
    res.status(404).send({"message": "Cannot find given id."})
  }
})

app.listen(4000, () => console.log("Server Started!"));
