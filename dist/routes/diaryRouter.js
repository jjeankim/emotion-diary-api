"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Diary_1 = __importDefault(require("../models/Diary"));
const asyncHandler_1 = require("../utils/asyncHandler");
const diaryRouter = express_1.default.Router();
diaryRouter.get("/", (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diary = yield Diary_1.default.find();
    res.send(diary);
})));
diaryRouter.get("/:id", (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const diaryItem = yield Diary_1.default.findById(id);
    if (diaryItem)
        res.send(diaryItem);
})));
//create()새로 생성하기
diaryRouter.post("/", (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDiary = yield Diary_1.default.create(req.body);
    res.status(201).send(newDiary);
})));
//findById()와 save()메소드를 사용해서 찾고, 저장해야 유효성 검사 가능능
diaryRouter.patch("/:id", (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const diaryItem = yield Diary_1.default.findById(id);
    if (diaryItem) {
        const updates = req.body;
        Object.keys(req.body).forEach((key) => {
            diaryItem[key] = req.body[key];
        });
        yield diaryItem.save();
        res.send(diaryItem);
    }
    else {
        res.status(404).send({ message: "Cannot find given id" });
    }
})));
diaryRouter.delete("/:id", (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("도달달");
    const id = req.params.id;
    const diaryItem = yield Diary_1.default.findByIdAndDelete(id);
    if (diaryItem) {
        res.sendStatus(204);
    }
    else {
        res.status(404).send({ message: "Cannot find given id." });
    }
})));
exports.default = diaryRouter;
