<script setup lang="ts">
import api from "@/models/api";
import { ref } from "vue";

// SVG icons for success (check) and error (cross) messages
const iconCheck = new URL("@/assets/icons/icon-check.svg", import.meta.url).href;
const iconCross = new URL("@/assets/icons/icon-cross.svg", import.meta.url).href;

// Form fields
const username = ref("");
const password = ref("");

// Regex for validating input fields
const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;

// Validation states and messages
const isUsernameValid = ref<boolean | null>(null);
const isPasswordValid = ref<boolean | null>(null);
const usernameMessage = ref("");
const passwordMessage = ref("");
const successMessage = ref("");
const errorMessage = ref("");

/**
 * Validates the username input against the regex.
 * Sets appropriate validation state and message.
 */
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

/**
 * Validates the password input against the regex.
 * Sets appropriate validation state and message.
 */
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

/**
 * Submits a registration request to the backend API.
 * Performs client-side validation before sending the data.
 * Shows success or error message depending on result.
 */
const registerNewUser = async () => {
  // Reset all messages
  successMessage.value = "";
  errorMessage.value = "";
  usernameMessage.value = "";
  passwordMessage.value = "";

  // Run validation
  validateUsername();
  validatePassword();

  // Stop if validation fails
  if (!isUsernameValid.value || !isPasswordValid.value) return;

  try {
    // Submit registration request
    const response = await api.post("/auth/register", {
      username: username.value,
      password: password.value,
    });
    // Show success message and reset form
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

// Emit event to parent component to switch to login view
const emit = defineEmits<{
  (e: "switch-to-login"): void;
}>();

function handleSwitchToLogin() {
  emit("switch-to-login");
}
</script>

<template>
  <section class="form-container">
    <h2 class="form-h2">Register</h2>
    <!-- Registration form -->
    <form class="form" @submit.prevent="registerNewUser">
      <!-- Username field -->
      <label for="register-username">
        <span>Choose a username:</span>
        <input
          type="text"
          id="register-username"
          name="username"
          v-model="username"
          @blur="validateUsername"
        />
        <!-- Username validation message -->
        <div v-if="usernameMessage" class="message" role="alert" aria-live="assertive">
          <img v-if="isUsernameValid === true" :src="iconCheck" alt="" />
          <img v-else :src="iconCross" alt="" />
          {{ usernameMessage }}
        </div>
      </label>

      <!-- Password field -->
      <label for="register-password">
        <span>Choose a password: </span>
        <input
          type="password"
          id="register-password"
          name="password"
          v-model="password"
          @blur="validatePassword"
        />
        <!-- Password validation message -->
        <div v-if="passwordMessage" class="message" role="alert" aria-live="assertive">
          <img v-if="isPasswordValid === true" :src="iconCheck" alt="" />
          <img v-else :src="iconCross" alt="" />
          {{ passwordMessage }}
        </div>
      </label>

      <!-- Registration error message -->
      <div v-if="errorMessage" class="message" role="alert" aria-live="assertive">
        <img :src="iconCross" alt="" />
        {{ errorMessage }}
      </div>
      <!-- Registration success message -->
      <div v-if="successMessage" class="message" role="alert" aria-live="assertive">
        <img :src="iconCheck" alt="" />
        {{ successMessage }}
      </div>

      <!-- Form acitons -->
      <div class="form-actions">
        <input type="reset" value="Reset" />
        <input type="submit" value="Register" />
      </div>
    </form>

    <!-- Switch to login form -->
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
