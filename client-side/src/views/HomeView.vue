<template>
  <div>
    <h1>All Books</h1>
    <ul>
      <li v-for="book in books" :key="book._id">
        <router-link :to="`/books/${book._id}`">{{ book.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../models/api';

const books = ref([]);

onMounted(async () => {
  const response = await api.get('/books');
  books.value = response.data;
});
</script>
