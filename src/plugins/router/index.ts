import { createRouter, createWebHistory, type RouterOptions } from "vue-router";

import HomePage from "../../pages/HomePage.vue";
import LoginPage from "../../pages/LoginPage.vue";
import RegisterPage from "../../pages/RegisterPage.vue";
import { authGuard, firstVisitGuard, guestGuard } from "./guards";

const routes: RouterOptions["routes"] = [
  {
    name: "register",
    path: "/register",
    component: RegisterPage,
    beforeEnter: guestGuard,
  },
  {
    name: "login",
    path: "/login",
    component: LoginPage,
    beforeEnter: guestGuard,
  },

  {
    name: "home",
    path: "/",
    component: HomePage,
    beforeEnter: authGuard,
  },
];

const history: RouterOptions["history"] = createWebHistory();

const router = createRouter({
  routes,
  history,
});

router.beforeEach(firstVisitGuard);

export { router };
