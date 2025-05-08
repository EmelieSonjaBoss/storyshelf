import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

// MIDDLEWARE

// ROUTES

// CONNECT TO DATABASE

mongoose.connect(process.env.MONGODB_URL || "");

console.log("MongoDB URL:", process.env.MONGODB_URL);
// EXPRESS SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
