import { defineStore } from "pinia";
export const appStore = defineStore("appStore", {
  state() {
    return {
      userInfo: uni.getStorageSync("userInfo") || {},
      token: uni.getStorageSync("token") || null,
      cookie: uni.getStorageSync("cookie") || null,
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
    setCookie(data) {
      this.cookie = data;
      uni.setStorageSync("cookie", data);
    },
    resetState() {
      this.userInfo = {};
      this.token = null;
      this.cookie = null;
      uni.clearStorageSync();
    },
  },
});
