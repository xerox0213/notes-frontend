import type { NavigationGuard } from "vue-router";

import { getUser, initSession } from "../../api/auth";
import { useUserStore } from "../../stores/userStore";
import type { User } from "../../types";

const userStore = useUserStore();

let firstVisit = true;

export const firstVisitGuard: NavigationGuard = async () => {
  if (firstVisit) {
    try {
      await initSession();

      const response = await getUser();

      if (response.ok) {
        const user = (await response.json()) as User;
        userStore.user = user;
      }

      firstVisit = false;
    } catch {
      console.log("Première visite : problème du serveur");
    }
  }
};

export const authGuard: NavigationGuard = () => {
  if (!userStore.user) return { name: "login" };
};

export const guestGuard: NavigationGuard = () => {
  if (userStore.user) return { name: "home" };
};
