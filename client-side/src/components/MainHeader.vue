<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <div class="img-container">
      <img
        class="header-img"
        src="@/assets/images/book-header.png"
        alt="Open book"
        height="60px"
        width="60px"
      />
    </div>
    <h1>Storyshelf</h1>
   <router-link to="/auth" class="login-icon-container">
      <img src="@/assets/icons/icon-user.svg" />
      <span class="login-text">Login</span>
   </router-link>
  </header>
</template>

<style scoped>
.header {
  background-color: #ede6e6;
  display: flex;
  align-items: center;
  height: 6.25rem;
  padding: 1.25rem;
  width: 100vw;
}

.img-container,
.login-icon-container {
  flex: 0 0 auto;
}

.login-icon {
  height: 30px;
  width: 30px;
}

img {
  max-height: 60px;
  width: auto;
}

h1 {
  margin: 0;
  text-transform: uppercase;
  text-align: center;
  flex: 1;
}

.login-icon-container {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  text-decoration: none;
}

.login-text {
  font-size: 1rem;
  color: #333;
}
</style>
