import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB);
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};
