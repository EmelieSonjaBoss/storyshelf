/**
 * @module controllers/bookController
 * @description Express controller for handling CRUD operations on books.
 */

import { Request, Response } from "express";
import Book from "../models/Book";
import { IBook } from "../types/IBook";

/**
 * Fetches all books from the database.
 * 
 * @route GET /api/books
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const fetchAllBooks = async (req: Request, res: Response) => {
  try {
    res.json(await Book.find());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Fetches a single book by ID.
 * 
 * @route GET /api/books/:id
 * @param {Request} req - Express request object containing the book ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const fetchBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Creates a new book.
 * 
 * @route POST /api/books
 * @param {Request} req - Express request object containing book data in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const createBook = async (req: Request, res: Response) => {
    const { title, description, author, genres, image, published_year }: IBook = req.body;
  
    try {
      const newBook = new Book({ title, description, author, genres, image, published_year });
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  };

/**
 * Updates a book by ID.
 * 
 * @route PATCH /api/books/:id
 * @param {Request} req - Express request object containing book data in body and ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const updateBook = async (req: Request, res: Response) => {
  const { title, description, author, genres, image, published_year }: IBook = req.body;

  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title,
          description,
          author,
          genres,
          image,
          published_year,
        },
      }
    );

    if (updatedBook.matchedCount === 0) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }
    res.json({ message: "Book updated", data: await Book.findById(req.params.id) });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

/**
 * Deletes a book by ID.
 * 
 * @route DELETE /api/books/:id
 * @param {Request} req - Express request object containing the book ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.deleteOne({ _id: req.params.id });

    if (deletedBook.deletedCount === 0) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }
    res.json({ message: "Book deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};