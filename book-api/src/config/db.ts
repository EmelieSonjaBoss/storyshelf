/**
 * @module config/db
 * @description Establishes a connection to the MongoDB database using Mongoose.
 */

import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the provided connection string.
 *
 * @param {string} mongoUrl - The MongoDB connection URI
 * @returns {Promise<void>}
 */
export const connectToDatabase = async (mongoUrl: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to database");
  } catch (error: unknown) {
    console.log("Error connecting to database: " + error);
  }
};
