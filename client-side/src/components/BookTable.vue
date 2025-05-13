<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/models/api";
import type { IBook } from "@/types/IBook";

const books = ref<IBook[]>([]);

const fetchBooks = async () => {
  try {
    const response = await api.get("/books");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const deleteBook = async (id: string) => {
  try {
    await api.delete(`/books/${id}`);
    books.value = books.value.filter((book) => book._id !== id);
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

onMounted(fetchBooks);
</script>

<template>
  <table class="main-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Author</th>
        <th>Genres</th>
        <th>Published</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book._id">
        <td>{{ book.title }}</td>
        <td>{{ book.description }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.genres.join(', ') }}</td>
        <td>{{ book.published_year }}</td>
        <td>
          <button class="action-btn delete-btn" @click="deleteBook(book._id)">Delete</button>
          <button class="action-btn edit-btn">Edit</button>
        </td>

      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.main-table {
  width: 90vw;
  border-collapse: collapse;
  margin: 40px auto;
  border: 1px solid #ddd;
}

th, td {
  padding: 0.6rem;
  text-align: left;
  font-size: 0.9rem;
  border-bottom: 1px solid #ccc;
}

thead {
  background-color: #f2f2f2;
}

.action-btn {
  padding: 0.3rem 0.6rem;
  margin: 0.1rem;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #f3c3c3;
}

.edit-btn:hover {
  background-color: #c9c9c9;
}

</style>
