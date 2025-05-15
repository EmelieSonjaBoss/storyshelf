/**
 * @module router
 * @description Vue Router setup defining application routes and navigation guards.
 * Manages route components, route metadata (like authentication requirements), and redirects unauthorized users.
 */

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookView from "../views/BookView.vue";
import AuthView from "@/views/AuthView.vue";
import AdminView from "@/views/AdminView.vue";
import { createPinia } from "pinia";
import useAuthStore from "@/stores/useAuthStore";

/**
 * Vue Router instance with application routes.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // Define routes with their paths, names, and components
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,  // Main homepage displaying books
    },
    {
      path: "/books/:id",
      name: "Book",
      component: BookView,  // Page for individual book details, dynamic id param
    },
    {
      path: "/auth",
      name: "Auth",
      component: AuthView,  // Authentication page for login/register
    },
    {
      path: "/admin",
      name: "Admin",
      component: AdminView,  // Admin dashboard or protected area
      meta: {
        requiresAuth: true, // This route requires authentication
      },
    },
  ],
});

// Create Pinia store instance to access auth state
const pinia = createPinia();
const useAuth = useAuthStore(pinia);

/**
 * Global navigation guard.
 */
router.beforeEach((to, from, next) => {
  // If the route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !useAuth.isAuthenticated) {
    // Redirect to the auth page (login/register)
    next("/auth");
  } else {
    // Otherwise, allow navigation to the requested route
    next();
  }
});

export default router;
