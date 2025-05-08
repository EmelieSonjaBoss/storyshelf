import express from "express";
import { fetchAllUsers } from "../controllers/userController";
const router = express.Router();

router.get("/", fetchAllUsers);

export default router;
