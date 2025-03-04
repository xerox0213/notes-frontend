import { createRouter, createWebHistory, type RouterOptions } from "vue-router";

const routes: RouterOptions["routes"] = [];

const history: RouterOptions["history"] = createWebHistory();

export const router = createRouter({
  routes,
  history,
});
