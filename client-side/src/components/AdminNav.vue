<script setup lang="ts"></script>

<template>
  <nav class="admin-nav">
    <router-link class="icon-container" to="/Admin">
      <img src="@/assets/icons/icon-user.svg" />
      Users
    </router-link>
    <router-link class="icon-container center-link" to="/Login">
      <img src="@/assets/icons/icon-book.svg" />
      Books
    </router-link>
    <router-link class="icon-container" to="/Login">
      <img src="@/assets/icons/icon-plus.svg" />
      Add new book
    </router-link>
  </nav>
</template>

<style scoped>
.admin-nav {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
}

.icon-container {
  color: black;
  font-size: 0.8rem;
  text-decoration: none;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  width: 6rem;
}

.icon-container img {
  width: 25px;
  height: 25px;
}

@media only screen and (min-width: 620px) {
  .icon-container {
    font-size: 1rem;
  }
}
</style>
