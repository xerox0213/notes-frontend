import { API_URL } from "../utils";

export const initSession = async () => {
  await fetch(`${API_URL}/sanctum/csrf-cookie`);
};
