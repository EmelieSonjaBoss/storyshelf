/**
 * @module index
 * @description Entry point of the application. Sets up middleware, routes, and database connection,
 * then starts the Express server.
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db";

const app = express();

/**
 * Middleware setup
 * - Parses incoming JSON requests
 * - Parses cookies from incoming requests
 * - Enables CORS for all origins with credentials
 */
app.use(express.json()); // Parses incoming JSON payloads
app.use(cookieParser()); // Parses cookies attached to incoming requests
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this in production to whitelist domains <--
    credentials: true, // Allows cookies and other credentials to be sent with requests
  })
);

// Routes imports
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import bookRouter from "./routes/books";

/**
 * Route definitions
 * - `/users`: User-related operations (fetch, create, update, delete)
 * - `/auth`: Authentication operations (register, login, logout)
 * - `/books`: CRUD operations for books (create, read, update, delete)
 */
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/books", bookRouter);

/**
 * Connect to MongoDB database.
 * - Retrieves the MongoDB URL from environment variables (`.env` file).
 * - Establishes a connection using `connectToDatabase` utility.
 */
const mongoUrl = process.env.MONGODB_URL || "";
connectToDatabase(mongoUrl);

/**
 * Start the Express server.
 * - Listens on port 3000 for incoming HTTP requests.
 */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
