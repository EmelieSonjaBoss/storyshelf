<template>
  <div v-if="book">
    <h2>{{ book.title }}</h2>
    <p><strong>Author:</strong> {{ book.author }}</p>
    <p>{{ book.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../models/api';

const book = ref(null);
const route = useRoute();

onMounted(async () => {
  const response = await api.get(`/books/${route.params.id}`);
  book.value = response.data;
});
</script>
