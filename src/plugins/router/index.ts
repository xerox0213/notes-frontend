import { createRouter, createWebHistory, type RouterOptions } from "vue-router";

import LoginPage from "../../pages/LoginPage.vue";
import RegisterPage from "../../pages/RegisterPage.vue";
import { firstVisitGuard, guestGuard } from "./guards";

const routes: RouterOptions["routes"] = [
  {
    name: "register",
    path: "/register",
    component: RegisterPage,
    beforeEnter: [guestGuard],
  },
  {
    name: "login",
    path: "/login",
    component: LoginPage,
    beforeEnter: [guestGuard],
  },
];

const history: RouterOptions["history"] = createWebHistory();

const router = createRouter({
  routes,
  history,
});

router.beforeResolve(firstVisitGuard);

export { router };
