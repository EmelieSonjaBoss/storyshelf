<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { IBook } from "@/types/IBook";
import { useBookStore } from "@/stores/bookStore";

const bookStore = useBookStore();

// Props: receive a book object or null for editing
const props = defineProps<{
  book: IBook | null;
}>();

// Emits: only emits a "close" event to parent
const emit = defineEmits<{
  (e: "close"): void;
}>();

// Form fields initialized from the passed book prop or empty strings
const title = ref(props.book?.title || "");
const description = ref(props.book?.description || "");
const author = ref(props.book?.author || "");
// Genres input as comma-separated string
const genres = ref(props.book?.genres.join(", ") || "");
const image = ref(props.book?.image || "");
const published_year = ref(props.book?.published_year || "");

// State for displaying a success message after update
const successMessage = ref("");

// Submit handler: constructs updated book and calls store action
const submitForm = async () => {
  if (props.book) {
    // Parse the published year as an integer
    const parsedYear = parseInt(published_year.value as string);

    // Build the updated book object merging changes
    const updatedBook: IBook = {
      ...props.book,
      title: title.value,
      description: description.value,
      author: author.value,
      // Split genres string into array, trimming whitespace
      genres: genres.value.split(",").map(g => g.trim()),
      image: image.value,
      published_year: parsedYear,
    };

    try {
      // Await updating book in the store (API call)
      await bookStore.updateBook(updatedBook);
      // Show success message
      successMessage.value = "Book successfully updated!";

      // Clear the message after 4 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 4000);
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("There was an error updating the book.");
    }
  }
};
</script>

<template>
  <div class="form-container">
    <h2 class="form-h2">Edit Book</h2>
    <form class="form" @submit.prevent="submitForm">
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
        <transition name="fade">
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
        </transition>
        <!-- Close editor button emits "close" event -->
        <button type="button" @click="emit('close')" class="form-btn">Close Editor</button>
        <!-- Submit button triggers submitForm -->
        <input type="submit" value="Update Book" />
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.form-btn {
  padding: 1rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  font-family: "Geist", sans-serif;
  transition: background-color 0.2s;
  background-color: #3c3d40;
}

.form-btn:hover {
  background-color: #292a2c;
}
</style>
