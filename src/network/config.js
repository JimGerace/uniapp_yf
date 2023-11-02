const baseURL = "/api";

const request = (config) => {
  const { url, method, data, header, hideLoading } = config;

  let loading = uni.showLoading({ title: "加载中..." });
  hideLoading && (loading = null);

  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      method,
      data,
      withCredentials: true,
      timeout: 1000 * 60,
      header: {
        ...header,
        "Content-Type": "application/json;charset=UTF-8",
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        loading && uni.hideLoading();
      },
    });
  });
};

export default request;
