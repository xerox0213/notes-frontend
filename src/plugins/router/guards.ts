import type { NavigationGuard } from "vue-router";

import { getUser, initSession } from "../../api/auth";
import { useUserStore } from "../../stores/userStore";

let firstVisit = true;

export const firstVisitGuard: NavigationGuard = async () => {
  if (firstVisit) {
    try {
      await initSession();
      const userStore = useUserStore();
      userStore.user = await getUser();
    } catch (exception) {
      if (exception instanceof TypeError) {
        console.log("Erreur durant la requête");
      }
    } finally {
      firstVisit = false;
    }
  }
};

export const authGuard: NavigationGuard = () => {
  const userStore = useUserStore();
  if (!userStore.user) return { name: "login" };
};

export const guestGuard: NavigationGuard = () => {
  const userStore = useUserStore();
  if (userStore.user) return { name: "home" };
};
