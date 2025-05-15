<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import api from "@/models/api";
import type { IUser } from "@/types/IUser";
import type { IBook } from "@/types/IBook";

import UserTable from "@/components/UserTable.vue";
import BookTable from "@/components/BookTable.vue";
import AddBookForm from "@/components/AddBookForm.vue";
import AdminNav from "@/components/AdminNav.vue";
import BackButton from "@/components/BackButton.vue";

const currentSection = ref<"users" | "books" | "add">("users");

const users = ref<IUser[]>([]);
const columns = ["Username", "Password", "Is Admin", "Created At"];

const books = ref<IBook[]>([]);

const fetchBooks = async () => {
  try {
    const response = await api.get("/books");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books", error);
  }
};


onMounted(async () => {
  await fetchBooks();
});


onMounted(async () => {
  try {
    const [usersRes, booksRes] = await Promise.all([
      api.get("/users"),
      api.get("/books")
    ]);
    users.value = usersRes.data;
    books.value = booksRes.data;
  } catch (error) {
    console.error("Error fetching admin data", error);
  }
});

const formattedUsers = computed(() => {
  return users.value.map((user) => ({
    username: user.username,
    password: user.password,
    is_admin: user.is_admin ? "Yes" : "No",
    created_at: new Date(user.created_at).toLocaleDateString("sv-SE"),
  }));
});

const deleteBook = async (id: string) => {
  try {
    await api.delete(`/books/${id}`);
    books.value = books.value.filter((book) => book._id !== id);
  } catch (error) {
    console.error("Error deleting book", error);
  }
};

</script>

<template>

  <BackButton to="/" />

  <AdminNav @navigate="(section) => (currentSection = section)" />

  <div v-if="currentSection === 'users'">
    <UserTable :columns="columns" :data="formattedUsers" />
  </div>

  <div v-else-if="currentSection === 'books'">
    <BookTable :books="books" @delete="deleteBook" />

  </div>

  <div v-else-if="currentSection === 'add'">
    <AddBookForm />
  </div>
</template>

<style scoped></style>
