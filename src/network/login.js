import api from "./config";

// 获取openid信息
const openIdInfo = (data) => {
  return api({
    url: "/oauth/wx/getOpenId",
    method: "GET",
    data,
    noAuth: true,
  });
};

// 获取用户的token
const tokenInfo = (data) => {
  return api({
    url: "/oauth/wx/getUserToken",
    method: "GET",
    data,
    noAuth: true,
  });
};

export default {
  openIdInfo,
  tokenInfo,
};
