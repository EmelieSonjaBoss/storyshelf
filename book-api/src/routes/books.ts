/**
 * @module routes/books
 * @description Express router for book-related API endpoints.
 */

import express from "express";
import { deleteBook, 
    fetchAllBooks, 
    fetchBook, 
    updateBook,
createBook } from "../controllers/bookController";

const router = express.Router();

router.get("/", fetchAllBooks);
router.get("/:id", fetchBook);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
