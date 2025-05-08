import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES

// CONNECT TO DATABASE

mongoose.connect(process.env.MONGODB_URL || "");

console.log("MongoDB URL:", process.env.MONGODB_URL);
// EXPRESS SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
