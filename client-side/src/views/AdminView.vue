<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import api from "@/models/api";
import type { IUser } from "@/types/IUser";
// add ibook too??

import UserTable from "@/components/UserTable.vue";
import BookTable from "@/components/BookTable.vue";
import AddBookForm from "@/components/AddBookForm.vue";
import AdminNav from "@/components/AdminNav.vue";
import BackButton from "@/components/BackButton.vue";

const currentSection = ref<"users" | "books" | "add">("users");

const users = ref<IUser[]>([]);
const columns = ["Username", "Password", "Is Admin", "Created At"];

onMounted(async () => {
  try {
    const response = await api.get("/users");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users", error);
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
</script>

<template>

  <BackButton to="/" />

  <AdminNav @navigate="(section) => (currentSection = section)" />

  <div v-if="currentSection === 'users'">
    <UserTable :columns="columns" :data="formattedUsers" />
  </div>

  <div v-else-if="currentSection === 'books'">
    <BookTable />
  </div>

  <div v-else-if="currentSection === 'add'">
    <AddBookForm />
  </div>
</template>

<style scoped></style>
