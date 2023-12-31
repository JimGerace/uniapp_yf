import { appStore } from "@/store/index.js";
const baseURL =
  import.meta.env.MODE === "h5" ? "/dev" : import.meta.env.VITE_BASE_URL;

const request = (config) => {
  const store = appStore();
  const { url, method, data, hideLoading } = config;

  let loading = null;
  !hideLoading && (loading = uni.showLoading({ title: "加载中..." }));

  const header = {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: store.token,
  };

  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      method,
      data,
      withCredentials: true,
      timeout: 1000 * 60,
      header,
      success: (result) => {
        const { data, errMsg, statusCode } = result;
        if (statusCode !== 200) {
          uni.showToast({ title: errMsg, icon: "none", duration: 2000 });
        } else if (data.code != 200) {
          uni.showToast({ title: data.msg, icon: "none", duration: 2000 });
          handleIsLogin(store);
        }
        resolve(result.data);
      },
      fail: (err) => {
        reject(err);
        uni.showToast({
          icon: "none",
          title: err.errMsg,
          duration: 2000,
        });
        handleIsLogin(store);
      },
      complete: () => {
        loading && uni.hideLoading();
      },
    });
  });
};

// 回到注册界面
const handleIsLogin = (store) => {
  const instance = getCurrentPages()[0];
  if (!instance.route.includes("/login") && !store.token) {
    uni.reLaunch({
      url: "/pages/login/login",
      success: () => {
        uni.showToast({ title: "请重新登录！", icon: "none", duration: 2000 });
      },
    });
  }
};

export default request;
