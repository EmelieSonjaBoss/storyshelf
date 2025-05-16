<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import api from "@/models/api";
import type { IUser } from "@/types/IUser";
import type { IBook } from "@/types/IBook";

// Components
import UserTable from "@/components/UserTable.vue";
import BookTable from "@/components/BookTable.vue";
import AddBookForm from "@/components/AddBookForm.vue";
import AdminNav from "@/components/AdminNav.vue";
import BackButton from "@/components/BackButton.vue";
import EditUserForm from "@/components/EditUserForm.vue";

// Section switching: "users" | "books" | "add"
const currentSection = ref<"users" | "books" | "add">("users");

// ---------------------
// User Management
// ---------------------

const users = ref<IUser[]>([]);
const columns = ["Username", "Password", "Is Admin", "Created At"];

const selectedUser = ref<IUser | null>(null);
const editUserRef = ref<HTMLElement | null>(null);

/**
 * Fetch all users from the API.
 */
const refreshUsers = async () => {
  try {
    const res = await api.get("/users");
    users.value = res.data;
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

/**
 * Delete a user by ID.
 */
const deleteUser = async (id: string) => {
  try {
    await api.delete(`/users/${id}`);
    users.value = users.value.filter((u) => u._id !== id);
  } catch (error) {
    console.error("Error deleting user", error);
  }
};

/**
 * Open user edit form and scroll to it.
 */
const editUser = (user: IUser) => {
  selectedUser.value = user;
  nextTick(() => {
    editUserRef.value?.scrollIntoView({ behavior: "smooth" });
  });
};

/**
 * Close the user edit form.
 */
const closeEditUserForm = () => {
  selectedUser.value = null;
};

/**
 * Format users for display in the table.
 */
const formattedUsers = computed(() => {
  return users.value.map((user) => ({
    username: user.username,
    password: user.password,
    is_admin: user.is_admin ? "Yes" : "No",
    created_at: new Date(user.created_at).toLocaleDateString("sv-SE"),
  }));
});

// ---------------------
// Book Management
// ---------------------

const books = ref<IBook[]>([]);

/**
 * Fetch all books from the API.
 */
const fetchBooks = async () => {
  try {
    const response = await api.get("/books");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books", error);
  }
};

/**
 * Delete a book by ID.
 */
const deleteBook = async (id: string) => {
  try {
    await api.delete(`/books/${id}`);
    books.value = books.value.filter((book) => book._id !== id);
  } catch (error) {
    console.error("Error deleting book", error);
  }
};

// ---------------------
// Initial Load
// ---------------------

onMounted(async () => {
  try {
    const [usersRes, booksRes] = await Promise.all([
      api.get("/users"),
      api.get("/books"),
    ]);
    users.value = usersRes.data;
    books.value = booksRes.data;
  } catch (error) {
    console.error("Error fetching admin data", error);
  }
});
</script>

<template>
  <BackButton to="/" />

  <AdminNav @navigate="(section) => (currentSection = section)" />

  <transition name="fade" mode="out-in">
    <div v-if="currentSection === 'users'">
      <UserTable
        :columns="columns"
        :data="formattedUsers"
        :rawUsers="users"
        @edit="editUser"
        @delete="deleteUser"
      />

      <div ref="editUserRef">
        <EditUserForm
          v-if="selectedUser"
          :user="selectedUser"
          @close="closeEditUserForm"
        />
      </div>
    </div>

    <div v-else-if="currentSection === 'books'">
      <BookTable :books="books" @delete="deleteBook" />
    </div>

    <div v-else-if="currentSection === 'add'">
      <AddBookForm />
    </div>
  </transition>
</template>

<style scoped>
/* Add admin-specific styles here if needed */
</style>
