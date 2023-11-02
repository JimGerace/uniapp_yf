import { defineStore } from "pinia";
export const appStore = defineStore("appStore", {
  state() {
    return {};
  },
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: "appSystem",
        storage: sessionStorage,
      },
    ],
  },
});
