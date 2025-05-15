<script setup lang="ts">
import { ref } from "vue";
import useAuthStore from "@/stores/useAuthStore";
import type { ILoginCredentials } from "@/types/ICredentials";
import { useRouter } from "vue-router";

const emit = defineEmits(["switch-to-register"]);
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const iconCross = new URL("@/assets/icons/icon-cross.svg", import.meta.url).href;

const useAuth = useAuthStore();
const router = useRouter();

const loginHandler = async () => {
  errorMessage.value = "";
  const credentials: ILoginCredentials = {
    username: username.value,
    password: password.value,
  };
  try {
    await useAuth.login(credentials);
    if (useAuth.user) {
      router.push(useAuth.user.is_admin ? "/admin" : "/");
    } else {
      errorMessage.value = "Something went wrong, please try again.";
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
      <label for="login-username">
        Username:
        <input type="text" id="login-username" v-model="username" />
      </label>

      <label for="login-password">
        Password:
        <input type="password" id="login-password" v-model="password" />
      </label>
      <div v-if="errorMessage" class="message error" role="alert" aria-live="assertive">
        <img :src="iconCross" alt="" />
        {{ errorMessage }}
      </div>
      <div class="form-actions">
        <input type="reset" value="Reset" />
        <input type="submit" value="Login" />
      </div>
    </form>

    <p class="form-footer">
      Don't have an account?
      <a href="#" @click.prevent="emit('switch-to-register')">Register here</a>
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

.message {
  font-family: "Geist", sans-serif;
  font-size: 1rem;
  display: flex;
  align-items: center;
  font-style: italic;
}
</style>
