<script setup lang="ts">
const emit = defineEmits<{
  (e: 'switch-to-login'): void
}>()

function handleSwitchToLogin() {
  emit('switch-to-login')
}
</script>

<template>
  <section class="form-container">
    <h2 class="form-h2">Register</h2>
    <form class="form">
      <label for="register-username">
        Username:
        <input type="text" id="register-username" name="username" />
      </label>

      <label for="register-password">
        Password:
        <input type="password" id="register-password" name="password" />
      </label>

      <div class="form-actions">
        <input type="reset" value="Reset" />
        <input type="submit" value="Register" />
      </div>
    </form>

    <p class="form-footer">
      Already have an account?
      <a href="#" @click.prevent="handleSwitchToLogin">Login here</a>
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
