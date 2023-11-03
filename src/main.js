import { createSSRApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import * as api from "@/network/index.js";

import "@/static/reset.css";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  app.config.globalProperties.$api = api.default;

  app.use(pinia);

  return {
    app,
    pinia,
  };
}
