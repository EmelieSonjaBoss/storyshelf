import { Request, Response } from "express";
import User from "../models/User";

// GET ALL USERS
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    res.json(await User.find());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

// GET USER BY ID
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

// UPDATE USER BY ID

// DELETE USER BY ID
