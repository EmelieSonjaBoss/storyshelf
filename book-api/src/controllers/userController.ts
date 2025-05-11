/**
 * @module controllers/userController
 * @description Express controller for handling CRUD operations on users.
 */

import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

/**
 * Fetches all users from the database.
 * 
 * @route GET /api/users
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    res.json(await User.find());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Fetches a single user by ID.
 * 
 * @route GET /api/users/:id
 * @param {Request} req - Express request object containing the user ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const fetchUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Updates a user by ID.
 * If a new password is provided, it will be hashed before saving.
 * 
 * @route PATCH /api/users/:id
 * @param {Request} req - Express request object containing updated user data in body and ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const updateUser = async (req: Request, res: Response) => {
  const { username, password, is_admin } = req.body;

  let hashedPassword = password;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          username: username,
          password: hashedPassword,
          is_admin: is_admin,
        },
      }
    );

    if (updatedUser.matchedCount === 0) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ message: "User updated", data: await User.findById(req.params.id) });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Deletes a user by ID.
 * 
 * @route DELETE /api/users/:id
 * @param {Request} req - Express request object containing the user ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });

    if (deletedUser.deletedCount === 0) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ message: "User deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};