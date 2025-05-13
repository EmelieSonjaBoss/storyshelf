<script setup lang="ts">
import MainTable from "@/components/MainTable.vue";
import api from "@/models/api";
import { ref, onMounted, computed } from "vue";
import type { IUser } from "@/types/IUser";
import AdminNav from "@/components/AdminNav.vue";

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
  <AdminNav />
  <MainTable :columns="columns" :data="formattedUsers" />
</template>

<style scoped></style>
