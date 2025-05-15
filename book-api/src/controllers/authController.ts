/**
 * @module controllers/authController
 * @description Express controller for handling user authentication (register, login, logout).
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { verifyPassword } from "../services/authService";

/**
 * Registers a new user.
 *
 * @route POST /api/auth/register
 * @param {Request} req - Express request object containing username, password, and is_admin in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const register = async (req: Request, res: Response) => {
  console.log("Request body:", req.body);
  const { username, password } = req.body;

  if (username === undefined) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  if (password === undefined) {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  const is_admin = req.body.is_admin !== undefined ? req.body.is_admin : false;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, password: hashedPassword, is_admin });
    res.json(newUser);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Logs in a user and sets a JWT as an HTTP-only cookie.
 *
 * @route POST /api/auth/login
 * @param {Request} req - Express request object containing username and password in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    res.status(401).json({ message: "Username and password are required" });
    return;
  }

  try {
    const user = await User.findOne({ username });
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("Missing JWT_SECRET in .env file");
    }

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const accessToken = jwt.sign({ username }, jwtSecret, { expiresIn: "15min" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Consider setting to true in production with HTTPS
      sameSite: "none",
      maxAge: 1000 * 60 * 15,
    });
    res.json({
      message: "You are logged in",
      is_admin: user.is_admin,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Logs out the user by clearing the access token cookie.
 *
 * @route POST /api/auth/logout
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {void}
 */
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.json({ message: "You are logged out and token has been cleared" });
};
