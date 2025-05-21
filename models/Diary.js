import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 200,
    },
    emotionId: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Diary = mongoose.model("Diary", DiarySchema);

export default Diary;
