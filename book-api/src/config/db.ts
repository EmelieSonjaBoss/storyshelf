/**
 * @module config/db
 * @description Establishes a connection to the MongoDB database using Mongoose.
 */

import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the provided connection URI.
 *
 * @param {string} mongoUrl - The MongoDB connection URI from environment variables
 * @returns {Promise<void>}
 */
export const connectToDatabase = async (mongoUrl: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error connecting to MongoDB:", message);
    process.exit(1); // Exit process if DB connection fails
  }
};
