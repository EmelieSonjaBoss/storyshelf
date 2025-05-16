<script setup lang="ts">
import { ref, watch } from "vue";
import type { IUser } from "@/types/IUser";
import { useUserStore } from "@/stores/userStore";

/**
 * Props: The user to edit.
 */
const props = defineProps<{ user: IUser }>();

/**
 * Emits: "close" when the form is dismissed or submitted successfully.
 */
const emit = defineEmits(["close"]);

const userStore = useUserStore();

// Form fields
const username = ref(props.user.username);
const password = ref(""); // Leave blank to keep unchanged
const isAdmin = ref(props.user.is_admin);

/**
 * Watches for changes to the `user` prop and updates the local form fields accordingly.
 */
watch(
  () => props.user,
  (newUser) => {
    username.value = newUser.username;
    password.value = "";
    isAdmin.value = newUser.is_admin;
  }
);

// Optional success message to show after update
const successMessage = ref("");

/**
 * Sends a PATCH request via the userStore to update the user data.
 * Shows a temporary success message and emits 'close' after success.
 */
const saveChanges = async () => {
  try {
    const updatedUser: IUser = {
      ...props.user,
      username: username.value,
      is_admin: isAdmin.value,
      // Only include password if it's provided
      ...(password.value && { password: password.value }),
    };

    await userStore.updateUser(updatedUser);

    successMessage.value = "User updated successfully!";
    setTimeout(() => {
      successMessage.value = "";
      emit("close");
    }, 2000);
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};
</script>

<template>
  <div class="form-container">
    <h2 class="form-h2">Edit User</h2>
    <form class="form" @submit.prevent="saveChanges">
      <label>
        Username:
        <input v-model="username" type="text" autocomplete="off" required />
      </label>

      <label>
        New Password:
        <input
          v-model="password"
          type="password"
          autocomplete="new-password"
          placeholder="Leave blank to keep unchanged"
        />
      </label>

      <label class="checkbox-label">
        <input type="checkbox" v-model="isAdmin" />
        Admin
      </label>

      <div class="form-actions">
        <transition name="fade">
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
        </transition>
        <button type="button" @click="$emit('close')" class="form-btn">
          Close
        </button>
        <input type="submit" value="Save Changes" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  padding-top: 3rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
}

.form label {
  display: flex;
  flex-direction: column;
  font-family: "Geist", sans-serif;
  font-size: 1rem;
}

input[type="text"],
input[type="password"] {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.checkbox-label {
  font-family: "Geist", sans-serif;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-actions {
  position: relative;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.success-message {
  position: absolute;
  bottom: 4.5rem;
  left: 0;
  width: 100%;
  text-align: center;
  font-family: "Geist", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.form-btn {
  padding: 1rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  font-family: "Geist", sans-serif;
  transition: background-color 0.2s;
  background-color: #3c3d40;
}

.form-btn:hover {
  background-color: #292a2c;
}
</style>
