<script setup lang="ts">
import { ref } from "vue";
import type { IBook } from "@/types/IBook";
import { useBookStore } from "@/stores/bookStore";

const bookStore = useBookStore();

// Form fields bound to input values
const title = ref("");
const description = ref("");
const author = ref("");
const genres = ref(""); // Comma-separated genres input, parsed to array on submit
const image = ref("");
const published_year = ref("");

// Message to show after successful submission or error
const successMessage = ref("");

// Handles form submission to add a new book
const submitForm = async () => {
  // Prepare new book object; omit _id because backend generates it
  const newBook: Omit<IBook, "_id"> = {
    title: title.value,
    description: description.value,
    author: author.value,
    genres: genres.value.split(",").map(g => g.trim()),
    image: image.value,
    published_year: parseInt(published_year.value),
  };

  try {
    // Call store action to add the book
    await bookStore.addBook(newBook);
    successMessage.value = "Book successfully added!";

    // Clear success message after 6 seconds
    setTimeout(() => {
      successMessage.value = "";
    }, 6000);

    resetForm();
  } catch (error) {
    console.error("Failed to add book:", error);
    successMessage.value = "There was an error adding the book.";

    // Clear error message after 6 seconds
    setTimeout(() => {
      successMessage.value = "";
    }, 6000);
  }
};

// Reset all form fields to empty strings
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

    <form class="form" @submit.prevent="submitForm" @reset.prevent="resetForm">
      <label>
        Title:
        <input type="text" v-model="title" required />
      </label>

      <label>
        Description:
        <input type="text" v-model="description" required />
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
        <!-- Show success or error message with fade transition -->
        <transition name="fade">
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
        </transition>

        <input type="reset" value="Reset" />
        <input type="submit" value="Add Book" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  padding-top: 3rem;
}

.form-actions {
  position: relative;
}

.success-message {
  position: absolute;
  bottom: 4.5rem;
  left: 0;
  width: 100%;
  text-align: center;
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  pointer-events: none;
}

/* Fade transition for success message */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
