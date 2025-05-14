<!-- src/components/LoginForm.vue -->
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'switch-to-register'): void
}>()

function handleSwitchToRegister() {
  emit('switch-to-register')
}
</script>

<template>
  <section class="form-container">
    <h2 class="form-h2">Login</h2>
    <form class="form">
      <label for="login-username">
        Username:
        <input type="text" id="login-username" name="username" />
      </label>

      <label for="login-password">
        Password:
        <input type="password" id="login-password" name="password" />
      </label>

      <div class="form-actions">
        <input type="reset" value="Reset" />
        <input type="submit" value="Login" />
      </div>
    </form>

    <p class="form-footer">
      Don't have an account?
      <a href="#" @click.prevent="handleSwitchToRegister">Register here</a>
    </p>
  </section>
</template>

<style scoped>
.form-container {
  max-width: 500px;
}

.form-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
}
</style>
