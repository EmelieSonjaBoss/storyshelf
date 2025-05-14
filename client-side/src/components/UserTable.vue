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
  <table class="main-table">
    <thead>
      <tr>
        <th class="column" v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td class="row" v-for="(value, key) in row" :key="key">{{ value }}</td>
      </tr>
    </tbody>
  </table>
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
</style>
