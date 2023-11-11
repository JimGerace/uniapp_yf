import api from "./config";

const PhoneLogin = (data) => {
  return api({
    url: "/login/cellphone",
    method: "POST",
    data,
  });
};

export default {
  PhoneLogin,
};
