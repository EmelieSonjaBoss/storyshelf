/**
 * @module models/User
 * @description Mongoose model definition for the user collection.
 */

import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/IUser";

/**
 * Mongoose schema for the User model.
 * Defines the structure of documents within the "users" collection.
 */
const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
