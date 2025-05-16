/**
 * @module stores/userStore
 * @description Pinia store module managing the state and operations for User entities.
 * Provides reactive storage of users and functions for fetching, updating, and deleting users via API.
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/models/api";
import type { IUser } from "@/types/IUser";

/**
 * Pinia store for managing users.
 * Provides reactive state and actions to fetch, update, and delete users via API.
 */
export const useUserStore = defineStore("userStore", () => {
  /** Reactive array holding the list of users */
  const users = ref<IUser[]>([]);

  /**
   * Fetch all users from the API and update the store.
   * @async
   */
  const fetchUsers = async () => {
    const response = await api.get("/users");
    users.value = response.data;
  };

  /**
   * Update an existing user via API and update them in the store.
   * @async
   * @param updatedUser - User object with valid _id to update
   */
  const updateUser = async (updatedUser: IUser) => {
    await api.patch(`/users/${updatedUser._id}`, updatedUser);

    // Find index of updated user and replace in the local array
    const index = users.value.findIndex(u => u._id === updatedUser._id);
    if (index !== -1) {
      users.value[index] = { ...updatedUser };
    }
  };

  /**
   * Delete a user by id via API and remove them from the store.
   * @async
   * @param userId - The _id string of the user to delete
   * @throws Will throw an error if the API call fails
   */
  const deleteUser = async (userId: string) => {
    try {
      await api.delete(`/users/${userId}`);
      users.value = users.value.filter(user => user._id !== userId);
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  };

  return { users, fetchUsers, updateUser, deleteUser };
});
