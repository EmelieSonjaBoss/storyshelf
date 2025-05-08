import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { username, password, is_admin } = req.body;

  if (username === undefined) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  if (password === undefined) {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  if (is_admin === undefined) {
    res.status(400).json({ error: "Admin status is required" });
    return;
  }

  try {
    const newUser = await User.create({ username, password, is_admin });
    res.json(newUser);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

// LOGIN

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    res.status(401).json({ message: "Username and password is required" });
  }

  try {
    const user = await User.findOne({ username });
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("Missing JWT_SECRET in .env file");
    }

    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid username or password" });
    } else {
      const accessToken = jwt.sign({ username }, jwtSecret, { expiresIn: "15min" });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 15,
      });
      res.json({ message: "You are logged in" });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

// LOGOUT

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.json({ message: "You are loged out and token has been cleared" });
};
