<script setup lang="ts">
import { useRouter } from 'vue-router'

// Access the router instance to programmatically navigate
const router = useRouter()

// Define props with optional 'to' string for a target route
defineProps<{
  to?: string
}>()

// Function to handle going back or navigating to a specific route
function goBack(to?: string) {
  if (to) {
    // Navigate to the specified route if provided
    router.push(to)
  } else {
    // Otherwise, go back in browser history (like the back button)
    router.back()
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
