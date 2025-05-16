<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { IUser } from "@/types/IUser";

/**
 * RowData represents a flat key-value mapping of user display data.
 * Used for rendering simplified table rows (e.g., stringified boolean for "is_admin").
 */
interface RowData {
  [key: string]: string | boolean;
}

// Emits events for parent components to handle edit/delete actions
const emit = defineEmits<{
  (e: "edit", user: IUser): void;
  (e: "delete", userId: string): void;
}>();

// Props for configuring the table and referencing original user data
const props = defineProps<{
  columns: string[];     // Column titles for the table header
  data: RowData[];       // Display-processed row values (e.g., mapped booleans)
  rawUsers: IUser[];     // Full user objects (used for edit/delete actions)
}>();
</script>

<template>
  <div class="table-wrapper">
    <table class="main-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td class="row" v-for="(value, key) in row" :key="key">{{ value }}</td>
          <td class="row">
            <button
              class="action-btn delete-btn"
              @click="$emit('delete', rawUsers[index]._id)"
            >
              Delete
            </button>
            <button
              class="action-btn edit-btn"
              @click="$emit('edit', rawUsers[index])"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
