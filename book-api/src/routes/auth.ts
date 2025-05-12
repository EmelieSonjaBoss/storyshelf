/**
 * @module routes/auth
 * @description Express router for authentication-related API endpoints.
 */

import express from "express";
import { login, logout, register } from "../controllers/authControllter";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
