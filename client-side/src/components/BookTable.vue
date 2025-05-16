<script setup lang="ts">
import { useBookStore } from "@/stores/bookStore";
import { onMounted, ref, nextTick } from "vue";
import EditBookForm from "@/components/EditBookForm.vue";
import type { IBook } from "@/types/IBook";
// Access the global book store for state and actions
const bookStore = useBookStore();

// Track the book currently selected for editing
const selectedBook = ref<IBook | null>(null);

// Reference to the edit form container element for scrolling into view
const editFormRef = ref<HTMLElement | null>(null);

// Trigger editing mode by setting selectedBook and scrolling the edit form into view smoothly
const editBook = (book: IBook) => {
  selectedBook.value = book;
  nextTick(() => {
    editFormRef.value?.scrollIntoView({ behavior: "smooth" });
  });
};

// Close the edit form by clearing the selectedBook
const closeEditForm = () => {
  selectedBook.value = null;
};

// Fetch the list of books when the component mounts
onMounted(() => {
  bookStore.fetchBooks();
});

// Delete a book by its id through the store action
const deleteBook = async (id: string) => {
  await bookStore.deleteBook(id);
};
</script>

<template>
  <div class="table-wrapper">
    <!-- Main table displaying all books with their details -->
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
        <!-- Iterate over books from the store -->
      <tr v-for="book in bookStore.books" :key="book._id">
          <td class="row">{{ book.title }}</td>
          <td class="row">{{ book.description }}</td>
          <td class="row">{{ book.author }}</td>
          <td class="row">{{ book.genres.join(", ") }}</td>
          <td class="row">{{ book.published_year }}</td>
          <td class="row">
            <!-- Delete button calls deleteBook with book id -->
          <button class="action-btn delete-btn" @click="deleteBook(book._id)">Delete</button>
            <!-- Edit button triggers editBook to open the edit form -->
          <button class="action-btn edit-btn" @click="editBook(book)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Edit form container, only shown if a book is selected -->
  <div ref="editFormRef">
    <EditBookForm v-if="selectedBook" :book="selectedBook" @close="closeEditForm" />
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin: 50px;
}

.main-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e1e6e9;
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
  font-size: 1rem;
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

@media only screen and (min-width: 620px) {
  .row {
    font-size: 1rem;
  }
}
</style>
