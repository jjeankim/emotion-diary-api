"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DiarySchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
        maxLength: 200,
    },
    emotionId: {
        type: Number,
        default: 3,
    },
}, {
    timestamps: true,
});
const Diary = mongoose_1.default.model("Diary", DiarySchema);
exports.default = Diary;
