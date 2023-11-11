export const message = ({ title = "提示", icon = "none", duration = 2000 }) => {
  uni.showToast({
    title,
    icon,
    duration,
    mask: true,
  });
};
