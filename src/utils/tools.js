export const message = ({ title = "提示", icon = "none", duration = 2000 }) => {
  uni.showToast({
    title,
    icon,
    duration,
    mask: true,
  });
};

// 节流
export const throttle = (func, wait) => {
  let flag = true;
  return function (...args) {
    if (flag) {
      setTimeout(() => {
        func.apply(this, args);
        flag = true;
      }, wait);
    }
    flag = false;
  };
};
