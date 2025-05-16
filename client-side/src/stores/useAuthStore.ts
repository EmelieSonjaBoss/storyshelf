import api from "@/models/api";
import type { ILoginCredentials, IRegisterCredentials } from "@/types/ICredentials";
import type { ILogedinUser } from "@/types/ILogedinUser";
import { defineStore } from "pinia";

/**
 * @module authStore
 * @description This store handles authentication-related actions such as login, logout, and registration.
 * It manages the user's authentication state and user data (if logged in).
 */
const useAuthStore = defineStore("auth", {
  state: () => ({
    // Boolean indicating whether the user is authenticated or not. Initially set to false.
    isAuthenticated: false,
    // The logged-in user's data. Initially set to null, and will be populated when the user logs in.
    user: null as ILogedinUser | null,
  }),

  // Logs in the user with the provided credentials. Sends a POST request to the backend's login endpoint, and on success,
  // sets the `user` and `isAuthenticated` state.
  actions: {
    async login(credentials: ILoginCredentials) {
      try {
        // Send login request to the API
        const response = await api.post("/auth/login", credentials, {
          withCredentials: true, // Ensure that cookies are sent with the request
        });

        const data = response.data;
        // Update the user state with data from the response
        this.user = {
          username: data.username,
          is_admin: data.is_admin,
        };
        // Mark the user as authenticated
        this.isAuthenticated = true;
      } catch (error) {
        console.error("Login error", error);
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    //  Logs out the user by sending a request to the backend's logout endpoint. Clears the user data and sets `isAuthenticated` to false.
    async logout() {
      try {
        // Send logout request to the API
        await api.post("/auth/logout", {}, { withCredentials: true });
        // Clear user data and set authentication state to false
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        console.error("Logout error", error);
      }
    },

    // Registers a new user with the provided credentials. Sends a POST request to the backend's register endpoint
    async register(credentials: IRegisterCredentials) {
      try {
        // Send registration request to the API
        await api.post("/register", credentials);
      } catch (error) {
        console.error("Register error", error);
      }
    },
  },
});

export default useAuthStore;
