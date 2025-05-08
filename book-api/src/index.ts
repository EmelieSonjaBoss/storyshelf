import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ROUTES
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
app.use("/users", userRouter);
app.use("/auth", authRouter);

// CONNECT TO DATABASE

mongoose.connect(process.env.MONGODB_URL || "");

console.log("MongoDB URL:", process.env.MONGODB_URL);
// EXPRESS SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
