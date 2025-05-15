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
      <img
        class="header-img"
        src="@/assets/images/shelf-header.png"
        alt="Small wooden bookshelf with books ant a plant."
      />
    </div>

    <div class="title-wrapper">
      <RouterLink to="/" class="h1-link hover">
        <h1>Storyshelf</h1>
      </RouterLink>
    </div>

    <div class="icon-wrapper">
      <RouterLink
        v-if="auth.isAuthenticated && auth.user?.is_admin"
        to="/admin"
        class="icon-container hover"
        :aria-label="'Admin panel'"
      >
        <img src="@/assets/icons/icon-admin.svg" alt="" />
        <span class="login-text">Admin</span>
      </RouterLink>

      <button
        class="icon-container hover"
        @click="handleLoginLogout"
        :aria-label="auth.isAuthenticated ? 'Logout' : 'Login'"
      >
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
  height: 5.25rem;
  width: 100vw;
}

.header-img {
  max-height: 90%;
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
  gap: 0.5rem;
}

.h1-link {
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;
}

.hover {
  transition: filter 0.3s ease;
}

.hover:hover {
  filter: drop-shadow(2px 2px 2px rgb(0, 0, 0, 0.4));
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
  height: 18px;
  width: 18px;
}

.login-text {
  font-size: 0.6rem;
  color: #333;
  font-family: "Geist", sans-serif;
}

@media only screen and (min-width: 620px) {
  .header {
    height: 7rem;
  }

  .login-text {
    font-size: 1rem;
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

.icon-wrapper {
  gap: 1.4rem;
}
</style>
