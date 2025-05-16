/**
 * @module stores/bookStore
 * @description Pinia store module managing the state and operations for Book entities.
 * Provides reactive storage of books and functions for fetching, adding, updating, and deleting books via API.
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBook } from "@/types/IBook";
import api from "@/models/api";

/**
 * Pinia store for managing books.
 * Provides reactive state and actions to fetch, add, update, and delete books via API.
 */
export const useBookStore = defineStore("book", () => {
  /** Reactive array holding the list of books */
  const books = ref<IBook[]>([]);

  /**
   * Fetch all books from the API and update the store.
   * @async
   */
  const fetchBooks = async () => {
    const response = await api.get("/books");
    books.value = response.data;
  };

  /**
   * Add a new book via API and append it to the store.
   * @async
   * @param newBook - Book data without _id (created by server)
   */
  const addBook = async (newBook: Omit<IBook, "_id">) => {
    const response = await api.post("/books", newBook);
    books.value.push(response.data);
  };

  /**
   * Update an existing book via API and update it in the store.
   * @async
   * @param updatedBook - Book object with valid _id to update
   */
  const updateBook = async (updatedBook: IBook) => {
    const response = await api.patch(`/books/${updatedBook._id}`, updatedBook);

    // Find index of updated book and replace it in the local array
    const index = books.value.findIndex((b) => b._id === updatedBook._id);
    if (index !== -1) {
      books.value[index] = response.data.data;
    }
  };

  /**
   * Delete a book by id via API and remove it from the store.
   * @async
   * @param id - The _id string of the book to delete
   * @throws Will throw an error if the API call fails
   */
  const deleteBook = async (id: string) => {
    try {
      await api.delete(`/books/${id}`);
      // Remove book from local store after successful deletion
      books.value = books.value.filter(book => book._id !== id);
    } catch (error) {
      console.error("Failed to delete book:", error);
      throw error; // Re-throw so caller can handle it if needed
    }
  };

  return { books, fetchBooks, addBook, updateBook, deleteBook };
});
