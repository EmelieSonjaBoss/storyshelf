<!-- src/components/BackButton.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  to?: string
}>()

function goBack(to?: string) {
  if (to) {
    router.push(to)
  } else {
    router.back() // Behaves like browser back button
  }
}
</script>

<template>
  <button @click="goBack(to)" class="back-button">
    Back
  </button>
</template>

<style scoped>
.back-button {
  background-color: #e1e6e9;
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  border: 0;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
}

.back-button:hover {
  background-color: #bfc3c5;
}

</style>
