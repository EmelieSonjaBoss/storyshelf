<script setup lang="ts">
import { ref } from "vue";
import api from "@/models/api";
import type { IBook } from "@/types/IBook";

// Define form fields
const title = ref("");
const description = ref("");
const author = ref("");
const genres = ref(""); // Input will be a comma-separated string, parsed to array
const image = ref("");
const published_year = ref("");

// Handle form submission
const submitForm = async () => {
  // Construct a book object, omitting _id because the server generates it
  const newBook: Omit<IBook, "_id"> = {
    title: title.value,
    description: description.value,
    author: author.value,
    genres: genres.value.split(",").map(g => g.trim()),
    image: image.value,
    published_year: parseInt(published_year.value),
  };

  try {
    // Send POST request to create a new book
    await api.post("/books", newBook, { withCredentials: true });
    alert("Book successfully added!"); // REMOVE THIS shit, make it right
    resetForm();
  } catch (error) {
    console.error("Failed to add book:", error);
    alert("There was an error adding the book.");
  }
};

// Reset form fields to empty
const resetForm = () => {
  title.value = "";
  description.value = "";
  author.value = "";
  genres.value = "";
  image.value = "";
  published_year.value = "";
};
</script>

<template>
  <div class="form-container">
    <h2 class="form-h2">Add New Book</h2>

     <!-- Prevent default submit/reset behavior and call handlers instead -->
    <form class="form" @submit.prevent="submitForm" @reset.prevent="resetForm">
      <label>
        Title:
        <input type="text" v-model="title" required />
      </label>
      <label>
        Description:
        <input type="text" v-model="description"  required />
      </label>
      <label>
        Author:
        <input type="text" v-model="author" required />
      </label>
      <label>
        Genres (comma-separated):
        <input type="text" v-model="genres" required />
      </label>
      <label>
        Image URL:
        <input type="text" v-model="image" />
      </label>
      <label>
        Published Year:
        <input type="text" v-model="published_year" required />
      </label>
      <div class="form-actions">
        <input type="submit" value="Add Book" />
        <input type="reset" value="Reset" />
      </div>
    </form>
  </div>
</template>


<style scoped>
.form-container {
  padding-top: 3rem;
}
</style>
