import express from "express";
import Diary, { IDiary } from "../models/Diary";
import { asyncHandler } from "../utils/asyncHandler.js"
const diaryRouter = express.Router()

diaryRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const diary = await Diary.find();
    res.send(diary);
  })
);

diaryRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const diaryItem = await Diary.findById(id);
    if (diaryItem) res.send(diaryItem);
  })
);

//create()새로 생성하기
diaryRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const newDiary = await Diary.create(req.body);
    res.status(201).send(newDiary);
  })
);

//findById()와 save()메소드를 사용해서 찾고, 저장해야 유효성 검사 가능능
diaryRouter.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const diaryItem = await Diary.findById(id);
    if (diaryItem) {
      const updates:Partial<IDiary> = req.body
      Object.keys(req.body).forEach((key) => {
        (diaryItem as any)[key] = req.body[key];
      });
      await diaryItem.save();
      res.send(diaryItem);
    } else {
      res.status(404).send({ message: "Cannot find given id" });
    }
  })
);

diaryRouter.delete(
  "/:id",
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

export default diaryRouter;