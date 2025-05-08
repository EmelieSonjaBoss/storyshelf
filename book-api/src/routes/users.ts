import express from "express";
import { fetchAllUsers, fetchUser } from "../controllers/userController";
const router = express.Router();

router.get("/", fetchAllUsers);
router.get("/:id", fetchUser);

export default router;
