import api from "./config";

// 账号登录
const PhoneLogin = (data) => {
  return api({
    url: "/login/cellphone",
    method: "POST",
    data,
  });
};

// 用户信息
const UserDetail = (data) => {
  return api({
    url: "/user/detail",
    method: "GET",
    data,
  });
};

// 退出登录
const Logout = (data) => {
  return api({
    url: "/logout",
    method: "GET",
    data,
  });
};

export default {
  PhoneLogin,
  UserDetail,
  Logout,
};
