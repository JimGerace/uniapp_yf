import { defineStore } from "pinia";
export const appStore = defineStore("appStore", {
  state() {
    return {
      userInfo: uni.getStorageSync("userInfo") || {},
      token: uni.getStorageSync("token") || null,
    };
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
      uni.setStorageSync("userInfo", data);
    },
    setToken(data) {
      this.token = data;
      uni.setStorageSync("token", data);
    },
  },
});
