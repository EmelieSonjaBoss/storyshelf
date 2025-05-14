<script setup lang="ts">
const emit = defineEmits(["navigate"]);
</script>

<template>
  <nav class="admin-nav">
    <div class="icon-container" @click="emit('navigate', 'users')">
      <img src="@/assets/icons/icon-user.svg" />
      Users
    </div>
    <div class="icon-container center-link" @click="emit('navigate', 'books')">
      <img src="@/assets/icons/icon-book.svg" />
      Books
    </div>
    <div class="icon-container" @click="emit('navigate', 'add')">
      <img src="@/assets/icons/icon-plus.svg" />
      Add new book
    </div>
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
