<script setup lang="ts">
import api from "@/models/api";
import { ref } from "vue";

const iconCheck = new URL("@/assets/icons/icon-check.svg", import.meta.url).href;
const iconCross = new URL("@/assets/icons/icon-cross.svg", import.meta.url).href;

const username = ref("");
const password = ref("");
const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
const isUsernameValid = ref<boolean | null>(null);
const isPasswordValid = ref<boolean | null>(null);
const usernameMessage = ref("");
const passwordMessage = ref("");
const successMessage = ref("");
const errorMessage = ref("");

const validateUsername = () => {
  if (!usernameRegex.test(username.value)) {
    usernameMessage.value =
      "Please enter a valid username (at least 3 characters: letters, numbers, or underscores).";
    isUsernameValid.value = false;
  } else {
    usernameMessage.value = "Username looks good!";
    isUsernameValid.value = true;
  }
};

const validatePassword = () => {
  if (!passwordRegex.test(password.value)) {
    passwordMessage.value =
      "Please enter a valid password (at least 5 characters, including uppercase, lowercase, a number, and a special character).";
    isPasswordValid.value = false;
  } else {
    passwordMessage.value = "Password looks good!";
    isPasswordValid.value = true;
  }
};

const registerNewUser = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  usernameMessage.value = "";
  passwordMessage.value = "";

  validateUsername();
  validatePassword();

  if (!isUsernameValid.value || !isPasswordValid.value) return;

  try {
    const response = await api.post("/auth/register", {
      username: username.value,
      password: password.value,
    });
    successMessage.value = "Registration was successful! You can now login! ";
    usernameMessage.value = "";
    passwordMessage.value = "";
    username.value = "";
    password.value = "";
  } catch (error) {
    console.error(error);
    errorMessage.value = "Registration failed. Please try again.";
  }
};

const emit = defineEmits<{
  (e: "switch-to-login"): void;
}>();

function handleSwitchToLogin() {
  emit("switch-to-login");
}
console.log("Registering user:", {
  username: username.value,
  password: password.value,
});
</script>

<template>
  <section class="form-container">
    <h2 class="form-h2">Register</h2>
    <form class="form" @submit.prevent="registerNewUser">
      <!-- USERNAME -->
      <label for="register-username">
        <span>Choose a username:</span>
        <input
          type="text"
          id="register-username"
          name="username"
          v-model="username"
          @blur="validateUsername"
        />
        <div v-if="usernameMessage" class="message" role="alert" aria-live="assertive">
          <img v-if="isUsernameValid === true" :src="iconCheck" alt="" />
          <img v-else :src="iconCross" alt="" />
          {{ usernameMessage }}
        </div>
      </label>

      <!-- PASSWORD -->
      <label for="register-password">
        <span>Choose a password: </span>
        <input
          type="password"
          id="register-password"
          name="password"
          v-model="password"
          @blur="validatePassword"
        />
        <div v-if="passwordMessage" class="message error" role="alert" aria-live="assertive">
          <img v-if="isPasswordValid === true" :src="iconCheck" alt="" />
          <img v-else :src="iconCross" alt="" />
          {{ passwordMessage }}
        </div>
      </label>

      <!-- REGISTER ERROR -->
      <div v-if="errorMessage" class="message error" role="alert" aria-live="assertive">
        <img :src="iconCross" alt="" />
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="message" role="alert" aria-live="assertive">
        <img :src="iconCheck" alt="" />
        {{ successMessage }}
      </div>

      <div class="form-actions">
        <input type="reset" value="Reset" />
        <input type="submit" value="Register" />
      </div>
    </form>

    <p class="form-footer">
      Already have an account?
      <a href="#" @click.prevent="handleSwitchToLogin">Login here</a>
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
