<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import api from "../models/api";
import type { IBook } from '../types/IBook';

// All fetched books from the API
const books = ref<IBook[]>([]);

// Currently selected genre for filtering
const selectedGenre = ref("All");

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
          <img :src="book.image" :alt="book.title" class="book-cover" />
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
  justify-content: space-between;
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

.book-cover {
  width: 100px;
  height: auto;
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
