import { createSSRApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import router from "@/router/index.js";

import "@/static/reset.css";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(pinia);
  app.use(router);
  return {
    app,
    pinia,
  };
}
