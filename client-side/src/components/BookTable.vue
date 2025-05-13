<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import api from "@/models/api";
import type { IBook } from "@/types/IBook";
import MainTable from "@/components/MainTable.vue";

const books = ref<IBook[]>([]);
const columns = ["Title", "Author", "Genres", "Published Year", "Description"];

onMounted(async () => {
  try {
    const response = await api.get("/books");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books", error);
  }
});

const formattedBooks = computed(() => {
  return books.value.map((book) => ({
    title: book.title,
    author: book.author,
    genres: book.genres.join(", "),
    published_year: book.published_year.toString(),
    description: book.description,
  }));
});
</script>

<template>
  <MainTable :columns="columns" :data="formattedBooks" />
</template>
