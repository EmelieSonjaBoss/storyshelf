<script setup lang="ts">
import useAuthStore from "@/stores/useAuthStore";
import type { ILoginCredentials } from "@/types/ICredentials";
import { ref } from "vue";
import { useRouter } from "vue-router";

const useAuth = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const loginHandler = async () => {
  errorMessage.value = "";

  const credentials: ILoginCredentials = {
    username: username.value,
    password: password.value,
  };

  try {
    console.log("Attempting to login with credentials:", credentials);
    const response = await useAuth.login(credentials);
    console.log("Login response:", response);
    if (useAuth.user) {
      if (useAuth.user.is_admin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      errorMessage.value = "Someting went wrong, please try again.";
    }
  } catch (error: any) {
    errorMessage.value = error.message || "Login failed";
  }
};
</script>

<template>
  <section class="form-container">
    <h2 class="form-h2">Login</h2>
    <form class="form" @submit.prevent="loginHandler">
      <span class="error" v-if="errorMessage" style="color: red">{{ errorMessage }}</span>
      <label for="username">
        Username:
        <input type="text" id="username" name="username" v-model="username" />
      </label>

      <label for="password">
        Password:
        <input type="password" id="password" name="password" v-model="password" />
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

.error {
  font-family: "Geist", sans-serif;
  font-size: 1rem;
}
</style>
