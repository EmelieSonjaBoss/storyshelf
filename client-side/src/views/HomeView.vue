<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import api from "../models/api";
import type { IBook } from '../types/IBook';

// All fetched books from the API
const books = ref<IBook[]>([]);

// Currently selected genre for filtering
const selectedGenre = ref("All");

// Track which images have loaded
const loadedImages = reactive<{ [key: string]: boolean }>({});

// Fetch books when the component is mounted
onMounted(async () => {
  const response = await api.get("/books");
  books.value = response.data;
});

// Conpute a sorted list of all genres
const allGenres = computed<string[]>(() => {
  const genreSet = new Set<string>();
  books.value.forEach((book) => {
    book.genres.forEach((genre) => genreSet.add(genre));
  });
  return ["All", ...Array.from(genreSet).sort()];
});

// Filter the books based on selected genre
const filteredBooks = computed(() => {
  if (selectedGenre.value === "All") return books.value;
  return books.value.filter((book) => book.genres.includes(selectedGenre.value));
});

function onImageLoad(id: string) {
  loadedImages[id] = true;
}

</script>

<template>
  <div class="home-container">

    <!-- Genre Filter -->
    <div class="filter-bar">
      <label for="genre-select">Filter by genre:</label>
      <select id="genre-select" v-model="selectedGenre">
        <option v-for="genre in allGenres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>

    <!-- Book Grid -->
    <div class="book-grid">
      <div class="book-card" v-for="book in filteredBooks" :key="book._id">
        <router-link :to="`/books/${book._id}`">
           <img
            :src="book.image"
            :alt="book.title"
            class="book-cover"
            :class="{ loaded: loadedImages[book._id] }"
            @load="onImageLoad(book._id)"
          />
        </router-link>
        <div class="book-info">
          <h2>{{ book.title }}</h2>
          <p><strong>Author:</strong> {{ book.author }}</p>
          <p><strong>Published:</strong> {{ book.published_year }}</p>
          <p class="genres">
            <strong>Genres: </strong>
            <span v-for="(genre, index) in book.genres" :key="index">
              {{ genre }}<span v-if="index < book.genres.length - 1">, </span>
            </span>
          </p>
          <router-link :to="`/books/${book._id}`" class="details-link">View Details</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 2rem;
}


.filter-bar {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  border-radius: 8px;
  height: 1.5rem;
}

select {
  border-radius: 8px;
  height: 1.5rem;
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: left;
}

.book-card {
  display: flex;
  flex-direction: row;
  background-color: #e1e6e9;
  border-radius: 8px;
  padding: 1rem;
  width: calc(25% - 1.125rem);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
}

/* Fade-in transition for book covers */
.book-cover {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.book-cover.loaded {
  opacity: 1;
  transform: scale(1);
}

.book-info {
  flex-grow: 1;
  margin-left: 1.5rem;
}

.book-info h3 {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.book-info p {
  margin: 0.3rem 0;
  font-size: 1rem;
}

@media (max-width: 1300px) { /* For smaller desktops */
  .book-card {
    width: calc(33.333% - 1rem);
  }
}

@media (max-width: 1024px) {
  .book-card {
    width: calc(50% - 0.75rem);
  }
}

@media (max-width: 600px) {
  .book-card {
    width: 100%;
  }

  .book-card h2 {
    font-size: 1.5rem;
  }

  .book-card h3,
  .book-card p {
    font-size: 1rem;
  }

  .book-cover {
    width: 80px;
  }
}

.book-cover {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.genres {
  font-size: 0.9rem;
  color: #444;
}

.details-link {
  display: inline-block;
  color: #2c3e50;
  text-decoration: underline;
  font-weight: bold;
}
</style>
