<script setup lang="ts">
import { useBookStore } from "@/stores/bookStore";
import { onMounted } from "vue";
import { ref } from "vue";
import EditBookForm from "@/components/EditBookForm.vue";
import type { IBook } from "@/types/IBook";
import { nextTick } from "vue";


const bookStore = useBookStore();
const selectedBook = ref<IBook | null>(null);
const editFormRef = ref<HTMLElement | null>(null);

const editBook = (book: IBook) => {
  selectedBook.value = book;
  nextTick(() => {
    editFormRef.value?.scrollIntoView({ behavior: "smooth" });
  });
};

const closeEditForm = () => {
  selectedBook.value = null;
};

onMounted(() => {
  bookStore.fetchBooks();
});

const deleteBook = async (id: string) => {
    await bookStore.deleteBook(id);
};

</script>
<template>
  <table class="main-table">
    <thead>
      <tr>
        <th class="column">Title</th>
        <th class="column">Description</th>
        <th class="column">Author</th>
        <th class="column">Genres</th>
        <th class="column">Published</th>
        <th class="column">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in bookStore.books" :key="book._id">
        <td class="row">{{ book.title }}</td>
        <td class="row">{{ book.description }}</td>
        <td class="row">{{ book.author }}</td>
        <td class="row">{{ book.genres.join(', ') }}</td>
        <td class="row">{{ book.published_year }}</td>
        <td class="row">
          <button class="action-btn delete-btn" @click="deleteBook(book._id)">Delete</button>
          <button class="action-btn edit-btn" @click="editBook(book)">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div ref="editFormRef">
   <EditBookForm v-if="selectedBook" :book="selectedBook" @close="closeEditForm" />
   </div>
</template>

<style scoped>
.main-table {
  width: 80vw;
  border-collapse: collapse;
  border: 1px solid #e1e6e9;
  margin: 50px auto;
}

.main-table th,
.main-table td {
  padding: 0.5rem;
  text-align: left;
}

.column {
  font-family: "Forum", serif;
}

.row {
  font-family: "Geist";
  font-size: 0.8rem;
}

thead {
  background-color: #e1e6e9;
}

tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

tbody tr:nth-child(even) {
  background-color: #ede6e6;
}

.action-btn {
  padding: 0.2rem 0.5rem;
  margin-right: 0.3rem;
  margin-bottom: 0.2rem;
  font-size: 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #bbb;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease;
  font-family: "Geist";
}

.delete-btn:hover {
  background-color: #f3c3c3;
}

.edit-btn:hover {
  background-color: #c9c9c9;
}
</style>
