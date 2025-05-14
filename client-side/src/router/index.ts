import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookView from "../views/BookView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AdminView from "@/views/AdminView.vue";
import { createPinia } from "pinia";
import useAuthStore from "@/stores/useAuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/books/:id",
      name: "Book",
      component: BookView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/admin",
      name: "Admin",
      component: AdminView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const pinia = createPinia();
const useAuth = useAuthStore(pinia);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !useAuth.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
