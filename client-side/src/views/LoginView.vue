<script setup lang="ts"></script>

<template>
  <section class="form-container">
    <h2 class="form-h2">Login</h2>
    <form class="form">
      <label for="username">
        Username:
        <input type="text" id="username" name="username" />
      </label>

      <label for="password">
        Password:
        <input type="password" id="password" name="password" />
      </label>

      <div class="form-actions">
        <input type="reset" value="Reset" />
        <input type="submit" value="Login" />
      </div>
    </form>
  </section>
</template>

<style scoped>
.form-container {
  max-width: 500px;
}
</style>
