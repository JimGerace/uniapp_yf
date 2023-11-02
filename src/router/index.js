import { createRouter, createWebHashHistory } from "vue-router";

const Login = () => import("@/pages/Login/Login.vue");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "uniapp";
  next();
});

export default router;
