/**
 * @module main
 * @description Entry point of the Vue application.
 * Initializes the app, sets up Pinia for state management and Vue Router for navigation, and mounts the app to the DOM.
 */

import "./assets/main.css"; // Global styles

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Create Pinia instance for state management
const pinia = createPinia();

// Create Vue app instance
const app = createApp(App);

// Register Pinia and Router as app plugins
app.use(pinia);
app.use(router);

// Mount the app to the #app element in index.html
app.mount("#app");
