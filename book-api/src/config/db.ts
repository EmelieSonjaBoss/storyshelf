import mongoose from "mongoose";

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to database");
  } catch (error: unknown) {
    console.log("Error connecting to database" + error);
  }
};
