import { Request, Response } from "express";
import User from "../models/User";

// FETCH ALL USERS
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    res.json(await User.find());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};
