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
    <router-link to="/login" class="login-icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="#000000"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="#000000"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
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
