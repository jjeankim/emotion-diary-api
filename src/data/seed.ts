import mongoose from "mongoose";
import Diary from "../models/Diary.js"
import * as dotenv from "dotenv";
dotenv.config()

mongoose.connect(process.env.DATABASE_URL as string);

// await Diary.deleteMany({});
// await Diary.insertMany(diaryList);

// mongoose.connection.close();

const main = async (): Promise<void> => {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    throw new Error("DATABASE_URL is not defined in .env");
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    await Diary.deleteMany({});
    console.log("All existing tasks deleted");

    await Diary.insertMany({});
    console.log("Seed data inserted");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
};

main
