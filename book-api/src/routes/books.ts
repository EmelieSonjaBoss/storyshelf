/**
 * @module routes/books
 * @description Express router for book-related API endpoints.
 */

import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { deleteBook, 
    fetchAllBooks, 
    fetchBook, 
    updateBook,
createBook } from "../controllers/bookController";

const router = express.Router();

router.get("/", fetchAllBooks);
router.get("/:id", fetchBook);
router.post("/", verifyToken, createBook);
router.patch("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;
