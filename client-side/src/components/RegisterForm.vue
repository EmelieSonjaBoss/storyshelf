<!-- src/components/RegisterForm.vue -->
<script setup lang="ts"></script>

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
  </section>
</template>

<style scoped>
.form-container {
  max-width: 500px;
}
</style>
