<script setup lang="ts">
import { ref } from "vue";
import useAuthStore from "@/stores/useAuthStore";
import type { ILoginCredentials } from "@/types/ICredentials";
import { useRouter } from "vue-router";

// Emit event to switch to the registration form
const emit = defineEmits(["switch-to-register"]);

// Form input fields and error message state
const username = ref("");
const password = ref("");
const errorMessage = ref("");

// Icon used for error messages
const iconCross = new URL("@/assets/icons/icon-cross.svg", import.meta.url).href;

// Access auth store and Vue Router
const useAuth = useAuthStore();
const router = useRouter();

/**
 * Handles the login form submission.
 * Sends the credentials to the auth store and redirects the user upon success.
 * If login fails, an error message is shown.
 */
const loginHandler = async () => {
  // Reset error message
  errorMessage.value = "";

  const credentials: ILoginCredentials = {
    username: username.value,
    password: password.value,
  };

  try {
    await useAuth.login(credentials);

    // Redirect based if user is admin
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

    <!-- Login form -->
    <form class="form" @submit.prevent="loginHandler">
      <label for="login-username">
        Username:
        <input type="text" id="login-username" v-model="username" />
      </label>

      <!-- Password input -->
      <label for="login-password">
        Password:
        <input type="password" id="login-password" v-model="password" />
      </label>

      <!-- Error message shown if login fails -->
      <div v-if="errorMessage" class="message error" role="alert" aria-live="assertive">
        <img :src="iconCross" alt="" />
        {{ errorMessage }}
      </div>

      <!-- Form action buttons -->
      <div class="form-actions">
        <input type="reset" value="Reset" />
        <input type="submit" value="Login" />
      </div>
    </form>

    <!-- Switch to register view -->
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
