<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const showLogin = ref(true)

function switchToRegister() {
  showLogin.value = false
}

function switchToLogin() {
  showLogin.value = true
}
</script>

<template>
  <div>
    <LoginForm v-if="showLogin" @switch-to-register="switchToRegister" />
    <RegisterForm v-else @switch-to-login="switchToLogin" />
  </div>
</template>


<style scoped>
.auth-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.auth-toggle {
  display: flex;
  gap: 1rem;
}
.auth-toggle button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.auth-toggle .active {
  font-weight: bold;
  background-color: #ddd;
}
</style>
