<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import api from '../models/api';

const books = ref([]);
const selectedGenre = ref('All');

onMounted(async () => {
  const response = await api.get('/books');
  books.value = response.data;
});

const allGenres = computed(() => {
  const genreSet = new Set();
  books.value.forEach(book => {
    book.genres.forEach(genre => genreSet.add(genre));
  });
  return ['All', ...Array.from(genreSet).sort()];
});

const filteredBooks = computed(() => {
  if (selectedGenre.value === 'All') return books.value;
  return books.value.filter(book => book.genres.includes(selectedGenre.value));
});
</script>

<template>
  <div class="home-container">
    <h1>All Books</h1>

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
        <h2>{{ book.title }}</h2>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Published:</strong> {{ book.published_year }}</p>
        <p class="genres">
          <strong>Genres:</strong>
          <span v-for="(genre, index) in book.genres" :key="index">
            {{ genre }}<span v-if="index < book.genres.length - 1">, </span>
          </span>
        </p>
        <router-link :to="`/books/${book._id}`" class="details-link">View Details</router-link>
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
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
}

.book-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  width: calc(25% - 1.125rem); /* Default: 4 per row */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ✅ Responsive layout */
@media (max-width: 1024px) {
  .book-card {
    width: calc(50% - 0.75rem); /* 2 per row on tablets */
  }
}

@media (max-width: 600px) {
  .book-card {
    width: 100%; /* 1 per row on phones */
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
  margin-top: 0.5rem;
  display: inline-block;
  color: #2c3e50;
  text-decoration: underline;
  font-weight: bold;
}
</style>
