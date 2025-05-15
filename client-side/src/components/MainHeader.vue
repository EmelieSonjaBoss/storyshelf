<script setup lang="ts">
import useAuthStore from "@/stores/useAuthStore";
import { RouterLink, useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const handleLoginLogout = () => {
  if (auth.isAuthenticated) {
    auth.logout();
    router.push("/");
  } else {
    router.push("/auth");
  }
};
console.log(auth.isAuthenticated);
</script>

<template>
  <header class="header">
    <div class="img-wrapper">
      <img class="header-img" src="@/assets/images/book-header.png" alt="Open book" />
    </div>
    <div class="title-wrapper">
      <RouterLink to="/" class="h1-link">
        <h1>Storyshelf</h1>
      </RouterLink>
    </div>

    <div class="icon-wrapper">

      <RouterLink v-if="auth.isAuthenticated && auth.user?.is_admin" to="/admin" class="icon-container"
        :aria-label="'Admin panel'">
        <img src="@/assets/icons/icon-admin.svg" alt="" />
        <span class="login-text">Admin</span>
      </RouterLink>

      <button class="icon-container" @click="handleLoginLogout" :aria-label="auth.isAuthenticated ? 'Logout' : 'Login'">
        <img src="@/assets/icons/icon-user.svg" alt="" />
        <span class="login-text">
          {{ auth.isAuthenticated ? "Logout" : "Login" }}
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #ede6e6;
  display: flex;
  align-items: center;
  height: 6.25rem;
  width: 100vw;
}

.header-img {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.img-wrapper,
.title-wrapper,
.icon-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.icon-wrapper {
  gap: 1rem;
}

.h1-link {
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
}

.icon-container {
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
}

.icon-container img {
  height: 20px;
  width: 20px;
}

.login-text {
  font-size: 0.8rem;
  color: #333;
  font-family: "Geist", sans-serif;
}

@media only screen and (min-width: 620px) {
  .login-text {
    font-size: 1rem;
  }

  .header-img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }

  .icon-container img {
    height: 30px;
    width: 30px;
  }

  .img-wrapper,
  .icon-wrapper {
    min-width: 120px;
  }
}
</style>
