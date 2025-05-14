import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBook } from "@/types/IBook";
import api from "@/models/api";

export const useBookStore = defineStore("book", () => {
  const books = ref<IBook[]>([]);

  const fetchBooks = async () => {
    const response = await api.get("/books");
    books.value = response.data;
  };

  const addBook = async (newBook: Omit<IBook, "_id">) => {
    const response = await api.post("/books", newBook);
    books.value.push(response.data); // Add to local state
  };

  const deleteBook = async (id: string) => {
    try {
      await api.delete(`/books/${id}`);
      books.value = books.value.filter(book => book._id !== id); // Remove from local state
    } catch (error) {
      console.error("Failed to delete book:", error);
      throw error;
    }
  };

  return { books, fetchBooks, addBook, deleteBook };
});
