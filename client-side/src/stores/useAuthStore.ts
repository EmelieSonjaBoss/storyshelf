import api from "@/models/api";
import type { ILoginCredentials, IRegisterCredentials } from "@/types/ICredentials";
import type { ILogedinUser } from "@/types/ILogedinUser";
import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as ILogedinUser | null,
  }),

  actions: {
    async login(credentials: ILoginCredentials) {
      try {
        const response = await api.post("/auth/login", credentials, {
          withCredentials: true,
        });

        const data = response.data;
        this.user = {
          username: data.username,
          is_admin: data.is_admin,
        };
        this.isAuthenticated = true;
      } catch (error) {
        console.error("Login error", error);
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    async logout() {
      try {
        await api.post("/auth/logout", {}, { withCredentials: true });
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        console.error("Logout error", error);
      }
    },

    async register(credentials: IRegisterCredentials) {
      try {
        await api.post("/register", credentials);
      } catch (error) {
        console.error("Register error", error);
      }
    },
  },
});

export default useAuthStore;
