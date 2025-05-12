/**
 * @module routes/users
 * @description Express router for user-related API endpoints.
 */

import express from "express";
import { deleteUser, fetchAllUsers, fetchUser, updateUser } from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", fetchAllUsers);
router.get("/:id", fetchUser);
router.patch("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
