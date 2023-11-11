import { createSSRApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import * as api from "@/network/index.js";

import "@/static/reset.css";
import { message } from "@/utils/tools.js";
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  app.config.globalProperties.$api = api.default;
  app.config.globalProperties.$message = message;

  app.use(pinia);

  return {
    app,
    pinia,
  };
}
