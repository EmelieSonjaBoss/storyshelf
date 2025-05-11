/**
 * @module index
 * @description Entry point of the application. Configures and starts the Express server, connects to MongoDB, and sets up routes and middleware.
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

/**
 * Middleware setup
 * - Parses incoming JSON requests
 * - Parses cookies from incoming requests
 * - Enables CORS for all origins with credentials
 */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Adjust this in production to whitelist domains <--
    credentials: true,
  })
);

// Route imports
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import bookRouter from "./routes/books";

/**
 * Route definitions
 * - /users: User-related operations
 * - /auth: Authentication (register, login, logout)
 * - /books: CRUD operations for books
 */
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/books", bookRouter);

/**
 * Connects to MongoDB using the connection string from environment variables.
 * Logs an error if the connection fails.
 */
mongoose.connect(process.env.MONGODB_URL || "");
console.log("MongoDB URL:", process.env.MONGODB_URL);

/**
 * Starts the Express server on the defined port.
 */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
