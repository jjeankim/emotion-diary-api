import mongoose from "mongoose";

export interface IDiary extends Document {
  content: string;
  emotionId: number;
  createdAt: Date;
  updatedAt: Date;
}

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

const Diary = mongoose.model<IDiary>("Diary", DiarySchema);

export default Diary;
