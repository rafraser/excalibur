// Theme
import "./theme.css";

// Tauri integration
import './events';

// Vue application
import { createApp } from "vue";
import App from "./App.vue";
createApp(App).mount("#app");