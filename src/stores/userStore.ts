import { defineStore } from "pinia";
import { ref } from "vue";

import type { User } from "../types";

const setup = () => {
  const user = ref<User>();

  return { user };
};

export const useUserStore = defineStore("user", setup);
