<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../models/api";
import type { IBook } from '../types/IBook';
import BackButton from "@/components/BackButton.vue";

// The fetched book
const book = ref<IBook | null>(null);
const route = useRoute();

// Track image load state
const imageLoaded = ref(false);

// Fetch books when the component is mounted
onMounted(async () => {
  const response = await api.get(`/books/${route.params.id}`);
  book.value = response.data;
});

</script>

<template>

    <BackButton to="/" />

  <div v-if="book" class="book-view-container">
    <div class="book-details">

      <!-- Book Cover -->
      <div class="book-cover-container">
             <img
          :src="book.image"
          :alt="book.title"
          class="book-cover"
          :class="{ loaded: imageLoaded }"
          @load="imageLoaded = true"
        />
      </div>

      <!-- Book Info -->
      <div class="book-info">
        <h2>{{ book.title }}</h2>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Published Year:</strong> {{ book.published_year }}</p>
        <p class="genres">
          <strong>Genres: </strong>
          <span v-for="(genre, index) in book.genres" :key="index">
            {{ genre }}<span v-if="index < book.genres.length - 1">, </span>
          </span>
        </p>
        <p>{{ book.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-view-container {
  padding: 8rem;
}

.book-details {
  display: flex;
  gap: 5rem;
  flex-direction: row;
}

.book-cover-container {
  width: 250px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-cover {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
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
}

.book-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.book-info p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.book-info .genres {
  font-size: 1rem;
  color: #444;
}

@media (max-width: 1024px) {
  .book-view-container {
    padding: 5rem;
  }
}

@media (max-width: 600px) {
  .book-details {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .book-cover-container {
    width: 200px;
  }

  .book-info {
    text-align: center;
    font-size: 1rem;
  }

  .book-view-container {
    padding: 2rem;
  }
}
</style>
