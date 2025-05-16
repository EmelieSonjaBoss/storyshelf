<script setup lang="ts">
import { defineProps } from "vue";

interface RowData {
  [key: string]: string | boolean;
}

const { columns, data } = defineProps({
  columns: {
    type: Array as () => string[],
    required: true,
  },
  data: {
    type: Array as () => RowData[],
    required: true,
  },
});
</script>

<template>
  <div class="table-wrapper">
    <table class="main-table">
      <thead>
        <tr>
          <th class="column" v-for="column in columns" :key="column">{{ column }}</th>
           <th class="column">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td class="row" v-for="(value, key) in row" :key="key">{{ value }}</td>
          <td class="row">
            <!-- Delete button calls deleteBook with book id -->
          <button class="action-btn delete-btn">Delete</button>
            <!-- Edit button triggers editBook to open the edit form -->
          <button class="action-btn edit-btn">Edit</button>
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
